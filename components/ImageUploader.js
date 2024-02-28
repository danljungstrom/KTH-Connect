import React from "react/index";
import * as ImagePicker from "expo-image-picker";
import {Pressable, StyleSheet, Text, View, Image} from "react-native";
import {colors} from "../assets/colors";
import {useState} from "react";
import {ResizableImage} from "./ResizableImage";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {close} from "../assets/icons";

export const ImageUploader = ({width, uploadInstruction, onImageChanged}) => {
    const [image, setImage] = useState(null)
    const dimensions = {width, height: width*0.4}

    function transformAndSetImage(imageObject) {
        const image = {
            source: {uri: imageObject.uri},
            width: imageObject.width,
            height: imageObject.height
        }
        setImage(image)
        onImageChanged(image)
    }

    function pickImage() {
        ImagePicker.launchImageLibraryAsync({mediaTypes: ImagePicker.MediaTypeOptions.Images})
            .then(result => {
                if(!result.canceled) transformAndSetImage(result.assets[0])
            })
            .catch(console.log)
    }

    return (image ?
        <View>
            <ResizableImage image={image} width={width}/>
            <Pressable style={styles.removeImageButton} onPress={() => setImage(null)}>
                <FontAwesomeIcon icon={close} color={colors.icons}/>
            </Pressable>
        </View>
        :
        <Pressable onPress={pickImage} style={{...styles.uploadBanner, ...dimensions}}>
            <Image source={require('../assets/uploadImage.png')} />
            <Text style={styles.uploadImageText}>{uploadInstruction}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    uploadBanner: {
        backgroundColor: colors.lowOpacityText,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7
    },
    uploadImageText: {
        color:colors.background,
    },
    removeImageButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        backgroundColor: colors.actionButtons,
        padding:10,
        borderRadius: '50%'
    }
});