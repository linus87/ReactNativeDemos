/**
 * Created by lyan2 on 17/5/17.
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
import Navigator from './navigator.js';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            permissions: null
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={[styles.container]}>
                <Navigator />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        marginTop: 21,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    }
});