/**
 * Created by lyan2 on 17/5/25.
 */
'use strict';
var React = require('react');
var ReactNative = require('react-native');
import Toast from 'react-native-root-toast';
var {
    ListView,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    } = ReactNative;
import AddressModel from '../modules/AddressModel.js';

export default class GeolocationPage extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
            r1.addr !== r2.addr;
        }});
        this.state = {
            addressDataSource: ds,
            initialPosition: 'unknown',
            lastPosition: 'unknown',
            address: '正在定位',
            modalVisible: false
        }
    }

    watchID = null;

    /**
     * Position structure: {
     *  coords: {longitude, latitude}
     * }
     * @param position
     */
    fetchAddress(position) {
        let {coords} = position;
        if (!position || !coords) return;

        let address = '定位失败';
        let url = 'http://api.map.baidu.com/geoconv/v1/?from=1&to=5&ak=D8c7c1411571551ef8fe556f08c594bd&coords=' + coords.longitude + ',' + coords.latitude;
        fetch(url, {method:'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.status == 0) {
                    let coords = responseJson.result[0] || {};
                    let url = 'http://api.map.baidu.com/geocoder/v2/?output=json&pois=1&ak=D8c7c1411571551ef8fe556f08c594bd&location=' + coords.y + ',' + coords.x;
                    fetch(url, {method: 'GET'})
                        .then((response) => response.json())
                        .then((responseJson) => {
                            let {formatted_address} = responseJson.result;
                            let pois = [].concat([{addr:formatted_address}]).concat(responseJson.result.pois);
                            this.setState({addressDataSource: this.state.addressDataSource.cloneWithRows(pois),
                                address: formatted_address || address, latitude: coords.x, longitude: coords.y, modalVisible:true});
                        })
                        .catch((error) => {
                            Toast.show(JSON.stringify(error), {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
                            this.setState({address: address});
                        });
                }
            }).catch((error) => {
                Toast.show(JSON.stringify(error), {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
                this.setState({address: address});
            });
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = position;
                this.setState({initialPosition});
                this.fetchAddress(this.state.initialPosition);
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lastPosition = position;
            this.setState({lastPosition});
            this.fetchAddress(this.state.initialPosition);
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    _onAddressSelect (rowData) {
        this.setState({modalVisible:false, address:rowData.addr});
    }

    render() {
        return (
            <View style={styles.container}>
                <AddressModel dataSource={this.state.addressDataSource} visible={this.state.modalVisible}
                    onSelect={this._onAddressSelect.bind(this)} />
                <Text>
                    <Text style={styles.title}>Initial position: </Text>
                    {JSON.stringify(this.state.initialPosition)}
                </Text>
                <Text>
                    <Text style={styles.title}>Current position: </Text>
                    {JSON.stringify(this.state.lastPosition)}
                </Text>
                <Text onPress={() => {this.setState({modalVisible:true})}}>
                    {this.state.address}
                </Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        marginTop: 44 /*navigator height*/,
        alignItems: 'center'
    },
    title: {
        fontWeight: '500',
    },
    addressRow: {
        paddingVertical: 10,
        paddingHorizontal: 10
    }
});