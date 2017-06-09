/**
 * Created by lyan2 on 17/6/9.
 */
var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    Text,
    TouchableHighlight,
    } = ReactNative;

export default class Button extends React.Component {
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

var styles = StyleSheet.create({
    button: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLabel: {
        color: 'blue',
    }
});