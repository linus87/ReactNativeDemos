/**
 * Created by lyan2 on 17/6/3.
 */
'use strict';
var React = require('react');
var ReactNative = require('react-native');
import Toast from 'react-native-root-toast';
var {
    Alert,
    ListView,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    WebView
    } = ReactNative;

var WEBVIEW_REF = 'webview';

export default class WebViewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    _onLoad() {
        this.refs[WEBVIEW_REF].postMessage("WebView loaded");
    }

    _onMessage(event) {
        Alert.alert(
            'Alert Title',
            event.nativeEvent.data,
            [
                {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        )
    }

    render() {
        //var source = {url:'http://html5test.com/'};
        var source = require('../html/messagetest.html');

        return (
            <WebView ref={WEBVIEW_REF}
                     source={source}
                     onLoad={this._onLoad.bind(this)}
                     javaScriptEnabled={true}
                     domStorageEnabled={true}
                     startInLoadingState={true}
                     onMessage={this._onMessage}
                >

            </WebView>
        );
    }
}

var styles = StyleSheet.create({
    title: {
        fontWeight: '500',
    },
    addressRow: {
        paddingVertical: 10,
        paddingHorizontal: 10
    }
});