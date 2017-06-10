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
import Button from '../components/Button.js';

var WEBVIEW_REF = 'webview';

export default class WebViewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    _onLoad() {
        this.refs[WEBVIEW_REF].postMessage("Web view loaded");
    }

    _onPress() {
        this.refs[WEBVIEW_REF].postMessage(this.state.count++);
    }

    _onMessage(event) {
        Alert.alert(
            'Across Document Message',
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
            <View style={styles.container}>
                <Text></Text>
                <Button onPress={this._onPress.bind(this)} label="Send Message"></Button>
                <WebView ref={WEBVIEW_REF}
                         source={source}
                         style={styles.webView}
                         onLoad={this._onLoad.bind(this)}
                         /*Controls whether to adjust the content inset for web views that are placed behind a navigation bar, tab bar, or toolbar. The default value is true.*/
                         automaticallyAdjustContentInsets={false}
                         javaScriptEnabled={true}
                         domStorageEnabled={true}
                         startInLoadingState={true}
                         onMessage={this._onMessage}
                    >
                </WebView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        marginTop: 44,
        //alignItems: 'stretch',
        flex:1
    },
    webView: {
        backgroundColor: '#0ff'
    },
});