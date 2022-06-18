import React from 'react'
import { ActivityIndicator, Image, StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'
import { images } from '../../assets/images'
import { colors } from '../../values/colors'

const Loader = props => {
    return (
        <Overlay
            isVisible={props.loader}
            overlayStyle={{backgroundColor:'#0000',elevation:0}}
            backdropStyle={{backgroundColor:'#00000080'}}
        >
            <ActivityIndicator 
                size={'large'}
                color={colors.accent}
            />
        </Overlay>
    )
}

export default Loader

const styles = StyleSheet.create({
    image : {
        height:240,
        width: 240,
        backgroundColor: '#00000000'
    },
    loader : {

    }
})
