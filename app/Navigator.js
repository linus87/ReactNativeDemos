/**
 * Created by lyan2 on 17/5/20.
 */
'use strict';

import React from 'react';
import {
    StyleSheet,
    NavigatorIOS,
    StatusBar,
    BackHandler,
    View
} from 'react-native';
import Main from './page/main.js';

let tempNavigator;
let isRemoved = false;

class Nav extends React.Component {
    constructor(props, context) {
        super(props, context);
        console.log(this); // get react native store object
        this._goBack = this._goBack.bind(this);

        BackHandler.addEventListener('hardwareBackPress', this._goBack);
        this.state = {
            animated: true,
            hidden: false
        }
    }

    _goBack() {
        if (tempNavigator && tempNavigator.getCurrentRoutes().length > 1) {
            tempNavigator.pop();
            return true;
        }
        return false;
    }


    render() {
        return (
            <NavigatorIOS
                ref="navigator"
                navigationBarHidden={false}
                style={styles.navigator}
                initialRoute={{
                    component: Main,
                    name: 'Main',
                    title: 'Main'
                  }}
                />
        );
    }
}

const styles = StyleSheet.create({
    navigator: {
        flex: 1
    }
});

export default Nav;