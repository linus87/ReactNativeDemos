/**
 * Created by lyan2 on 17/6/10.
 */
'use strict';
var React = require('react');
var ReactNative = require('react-native');
import Toast from 'react-native-root-toast';
var {
    Alert,
    Dimensions,
    Image,
    ListView,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
    } = ReactNative;
import CameraRollView from '../modules/CameraRollView.js';

export default class CameralRollPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupTypes:"SavedPhotos",
            imageMargin: 4
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <CameraRollView
                                batchSize={16}
                                imagesPerRow={4}
                                assetType="Photos"
                                groupTypes={this.state.groupTypes}
                    >
                </CameraRollView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1
    },
    image: {
        marginTop: 4,
        marginLeft: 4
    },
});