/**
 * Created by lyan2 on 17/5/20.
 */
'use strict';

var React = require('react');
var ReactNative = require('react-native');
import Notifications from 'react-native-push-notification';
var {
    AlertIOS,
    PushNotificationIOS,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    } = ReactNative;

Notifications.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
        console.log('TOKEN:', token);
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
        //Notifications.cancelAllLocalNotifications()
        //Notifications.cancelLocalNotifications(notification);
        console.log('NOTIFICATION:', notification);

        AlertIOS.alert(
            'Notification Received',
            'Alert message: ' + notification.message,
            [{
                text: 'Dismiss',
                onPress: null,
            }]
        );
    },

    onError: function(error) {
        AlertIOS.alert(
            'Push Notification Configuration Error',
            'Alert message: ' + error.message,
            [{
                text: 'Dismiss',
                onPress: null,
            }]
        );
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "141041616019",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true,
});

class Button extends React.Component {
    render() {
        return (
            <TouchableHighlight
                underlayColor={'white'}
                style={styles.button}
                onPress={this.props.onPress}>
                <Text style={styles.buttonLabel}>
                    {this.props.label}
                </Text>
            </TouchableHighlight>
        );
    }
}

export default class NotificationExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            permissions: null
        }
    }

    componentWillMount() {
        PushNotificationIOS.addEventListener('register', this._onRegistered);
        PushNotificationIOS.addEventListener('registrationError', this._onRegistrationError);

        Notifications.requestPermissions();
    }

    componentWillUnmount() {
        PushNotificationIOS.removeEventListener('register', this._onRegistered);
        PushNotificationIOS.removeEventListener('registrationError', this._onRegistrationError);
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={this._sendNotification}
                    label="Send fake notification"
                    />

                <Button
                    onPress={this._sendLocalNotification}
                    label="Send fake local notification"
                    />
                <Button
                    onPress={() => Notifications.setApplicationIconBadgeNumber(42)}
                    label="Set app's icon badge to 42"
                    />
                <Button
                    onPress={() => Notifications.setApplicationIconBadgeNumber(0)}
                    label="Clear app's icon badge"
                    />
                <Button
                    onPress={this._showPermissions.bind(this)}
                    label="Show enabled permissions"
                    />
                <Text>
                    {JSON.stringify(this.state.permissions)}
                </Text>
            </View>
        );
    }

    _showPermissions() {
        PushNotificationIOS.checkPermissions((permissions) => {
            this.setState({permissions});
        });
    }

    _sendNotification() {
        require('RCTDeviceEventEmitter').emit('remoteNotificationReceived', {
            aps: {
                alert: 'Sample notification',
                badge: '+1',
                sound: 'default',
                category: 'REACT_NATIVE'
            },
        });
    }

    _sendLocalNotification() {
        Notifications.getApplicationIconBadgeNumber((badge) => {
            Notifications.localNotificationSchedule({
                message: "10秒后发出的通知", // (required)
                number: badge + 1,
                userInfo: {id:'affair.schedule', "hello": "world"},
                date: new Date(Date.now() + (10 * 1000)) // in 10 secs
            });
        });

        Notifications.localNotification({
            /* Android Only Properties */
            id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            ticker: "您有剁手记本地通知", // (optional, audible announcement of this notification for accessibility services)
            autoCancel: true, // (optional) default: true; it means the notification should be canceled when it is clicked by the user
            largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
            smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
            bigText: "欢迎使用剁手记，更多内容持续更新中", // (optional) default: "message" prop
            subText: "感谢您使用剁手记", // (optional) default: none
            color: "red", // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            //tag: 'some_tag', // (optional) add tag to message
            group: "org.reactjs.native.example", // (optional) add group to message
            ongoing: false, // (optional) set whether this is an "ongoing" notification

            /* iOS only properties */
            alertAction: 'view', // (optional) default: view
            //category: null, // (optional) default: null
            //userInfo: null, // (optional) default: null (object containing additional notification data)

            /* iOS and Android properties */
            title: "剁手记本地通知准备就绪", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
            message: "您有新的剁手记本地通知", // (required)
            playSound: true, // (optional) default: true
            soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            number: 1, // (optional, deprecated in android API 24) Valid 32 bit integer specified as string. default: none (Cannot be zero)
            //repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
            //actions: '["Yes", "No"]'  // (Android only) See the doc for notification actions to know more
            userInfo: {id:'affair.schedule', "hello": "world"},
        });
    }

    _onRegistered(deviceToken) {
        AlertIOS.alert(
            'Registered For Remote Push',
            `Device Token: ${deviceToken}`,
            [{
                text: 'Dismiss',
                onPress: null,
            }]
        );
    }

    _onRegistrationError(error) {
        AlertIOS.alert(
            'Failed To Register For Remote Push',
            `Error (${error.code}): ${error.message}`,
            [{
                text: 'Dismiss',
                onPress: null,
            }]
        );
    }

}

var styles = StyleSheet.create({
    button: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLabel: {
        color: 'blue',
    },
    container: {
        marginTop: 44 /*navigator height*/,
        alignItems: 'center'
    }
});