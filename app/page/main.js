/**
 * Created by lyan2 on 17/5/20.
 */
'use strict';

import React from 'react';
import {
    ListView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import Notifications from 'react-native-push-notification';
import {pages} from '../pages.js';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        console.log(this);
        console.log(pages);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
            r1.id !== r2.id;
        }});
        this.state = {
            dataSource: ds.cloneWithRows(pages),
            permissions: null
        }
    }

    componentDidMount() {
        Notifications.checkPermissions((permissions) => {
            this.setState({permissions});
        });

        //Notifications.getApplicationIconBadgeNumber((badge) => {
        //    Notifications.localNotificationSchedule({
        //        message: "My Notification Message", // (required)
        //        number: badge + 1,
        //        userInfo: {"hello": "world"},
        //        date: new Date(Date.now() + (10 * 1000)) // in 10 secs
        //    });
        //});
        //
        //Notifications.localNotification({
        //    /* Android Only Properties */
        //    id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        //    ticker: "您有剁手记本地通知", // (optional, audible announcement of this notification for accessibility services)
        //    autoCancel: true, // (optional) default: true; it means the notification should be canceled when it is clicked by the user
        //    largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
        //    smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
        //    bigText: "欢迎使用剁手记，更多内容持续更新中", // (optional) default: "message" prop
        //    subText: "感谢您使用剁手记", // (optional) default: none
        //    color: "red", // (optional) default: system default
        //    vibrate: true, // (optional) default: true
        //    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        //    //tag: 'some_tag', // (optional) add tag to message
        //    group: "com.duoshouji", // (optional) add group to message
        //    ongoing: false, // (optional) set whether this is an "ongoing" notification
        //
        //    /* iOS only properties */
        //    alertAction: 'view', // (optional) default: view
        //    //category: null, // (optional) default: null
        //    //userInfo: null, // (optional) default: null (object containing additional notification data)
        //
        //    /* iOS and Android properties */
        //    title: "剁手记本地通知准备就绪", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
        //    message: "您有新的剁手记本地通知", // (required)
        //    playSound: false, // (optional) default: true
        //    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        //    number: 1, // (optional, deprecated in android API 24) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        //    //repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
        //    //actions: '["Yes", "No"]'  // (Android only) See the doc for notification actions to know more
        //});
    }

    render() {
        return (
            <ListView style={{backgroundColor:'#f00'}}
                      contentContainerStyle={{backgroundColor:'#00f'}}
                      dataSource={this.state.dataSource}
                      renderRow={this._renderRow.bind(this)}
                      renderSeparator={this._renderSeparator}
                />
        );
    }

    _renderRow (rowData, sectionID, rowID, highlightRow) {
        return (
            <TouchableHighlight onPress={() => {
                this._pressRow(rowData);
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

    _pressRow (rowData) {
        var {navigator} = this.props;
        console.log(navigator);
        if (navigator) {
            navigator.push(rowData.route);
        }

    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 21,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        marginBottom: 5,
    },
    text: {
        flex: 1,
    },
});