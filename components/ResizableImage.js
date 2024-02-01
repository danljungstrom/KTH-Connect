import React, { useState } from "react";
import { Image } from "react-native";

export const ResizableImage = ({uri, width, style}) => {

    const [aspectRatio, setAspectRatio] = useState(1)

    console.log(uri)

    Image.getSize(uri, (width, height) => {
        console.log(width)
        setAspectRatio(width / height)
    })

    return (
        <Image source={{uri}} style={{...style, width: width, height: width / aspectRatio}}/>
    );
}