import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const InputView = props => {

    const {
        placeholder,value,onChangeText,parentStyle,secureTextEntry,keyboardType,maxLength,
        selectionColor,error,touched
     } = props;

    return (
        <View style={props.viewStyle}>
          
            {
                error && touched
                &&
                <Text style={[styles.error]}>{error}</Text>
            }
        </View>
    )
}

export default InputView

const styles = StyleSheet.create({
    parentStyle : {
        marginTop:24
    },
    error : {
        fontSize:12,
        color:'#f00',
        paddingLeft:24,
        marginTop:4
    }
})
