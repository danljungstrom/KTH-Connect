import React from "react";
import { Image } from "react-native";

export const ResizableImage = ({image, width, style}) => {

    const aspectRatio = image.width / image.height
    const localImageMap = [
        require('../assets/mango.jpg'),
        require('../assets/kth.png')
    ]

    return (
        <Image source={localImageMap[image.source]} style={{...style, width: width, height: width / aspectRatio}}/>
    );
}