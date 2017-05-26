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

export default class GeolocationPage extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
            r1.addr !== r2.addr;
        }});
        this.state = {
            dataSource: ds,
            initialPosition: 'unknown',
            lastPosition: 'unknown',
            address: '正在定位'
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
                            this.setState({address: formatted_address || '定位失败', latitude: coords.x, longitude: coords.y});
                        })
                        .catch((error) => {
                            Toast.show(JSON.stringify(error), {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
                            this.setState({address: '定位失败'});
                        });
                }
            }).catch((error) => {
                Toast.show(JSON.stringify(error), {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
                that.setState({address: '定位失败'});
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

    _renderAddressRow (rowData, sectionID, rowID, highlightRow) {
        return (
            <TouchableHighlight onPress={() => {
                this._pressAddressRow(rowData);
                highlightRow(sectionID, rowID);
            }}>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.text}>
                            {rowData.label}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    _renderSeparator (sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
                }}/>
        );
    }

    _pressAddressRow (rowData) {
        var {navigator} = this.props;
        console.log(navigator);
        if (navigator) {
            navigator.push(rowData.route);
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <Modal visible={this.state.modalVisible} animationType={"slide"} transparent={false}>
                    <View style={{marginTop: 22}}>
                        <ListView style={{backgroundColor:'#f00'}}
                                  contentContainerStyle={{backgroundColor:'#00f'}}
                                  dataSource={this.state.dataSource}
                                  renderRow={this._renderAddressRow.bind(this)}
                                  renderSeparator={this._renderSeparator}
                            />
                    </View>
                </Modal>
                <Text>
                    <Text style={styles.title}>Initial position: </Text>
                    {JSON.stringify(this.state.initialPosition)}
                </Text>
                <Text>
                    <Text style={styles.title}>Current position: </Text>
                    {JSON.stringify(this.state.lastPosition)}
                </Text>
                <Text onPress={() => {console.log('Pressed on address');}}>
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
});