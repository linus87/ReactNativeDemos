/**
 * Created by lyan2 on 17/6/11.
 */
/**
 * Created by lyan2 on 16/8/2.
 */
import React, { Component } from 'react';
const ReactNative = require('react-native');
const {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
    } = ReactNative;
import CameraRollView from '../components/CameraRollView';

export default class PhotoSelector extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    _onPressImage(asset) {
        console.log(asset);
    }

    _renderImage(asset, props) {
        // props: CameralRollView properties.
        let {height, width} = Dimensions.get('window');
        let {imagesPerRow, imageMargin, imageProps} = props;
        let imageWidth = (width - (imagesPerRow + 1) * imageMargin ) / imagesPerRow;
        var imageStyle = [styles.image, {width: imageWidth, height: imageWidth}];
        return (
            <TouchableHighlight key={asset.node.image.uri} onPress={() => {this._onPressImage(asset)}}>
                <Image source={asset.node.image} style={imageStyle} {...imageProps}/>
            </TouchableHighlight>
        );
    }

    render() {
        let containerStyle = [styles.container, this.props.contentContainerStyle];

        return (
            <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={true}>
                <CameraRollView
                    batchSize={9}
                    groupTypes="SavedPhotos"
                    imagesPerRow={3}
                    assetType="Photos"
                    renderImage={this._renderImage.bind(this)}
                    />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF'
    },
    image: {
        marginTop: 4,
        marginLeft: 4
    }
});