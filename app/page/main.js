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
import {pages} from '../pages.js';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
            r1.id !== r2.id;
        }});
        this.state = {
            dataSource: ds.cloneWithRows(pages)
        }
    }

    componentDidMount() {

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
    text: {
        flex: 1,
    },
});