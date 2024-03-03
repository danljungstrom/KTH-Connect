import React from "react";
import { Image } from "react-native";

export const ResizableImage = ({image, width, style}) => {

    const aspectRatio = image.width / image.height

    return <Image source={{uri: image.source}} style={{...style, width: width, height: width / aspectRatio}}/>;
}