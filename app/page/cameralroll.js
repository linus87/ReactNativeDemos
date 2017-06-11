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
import CameraRollView from '../components/CameraRollView.js';
import PhotoSelector from '../modules/PhotoSelector.js';

export default class CameralRollPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                <PhotoSelector>
                </PhotoSelector>
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