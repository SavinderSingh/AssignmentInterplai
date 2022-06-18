import React from 'react'
import { StyleSheet} from 'react-native'
import { Button } from 'react-native-elements';
import { colors } from '../../values/colors';

const ButtonView = props => {

    const {title,containerStyle,buttonStyle,titleStyle,onPress,iconRight,iconLeft,outline,size} = props;

    const bgColor = outline ? '#fff' : colors.accent;
    const textColor = outline ? colors.accent : '#fff';
    // const borderColor = outline ? colors.accent : '#fff';

    let height = 48;
    let fontSize = 16

    if(size === 'small'){
        height = 28;
        fontSize = 12;
    }else if(size === 'medium'){
        height = 36;
        fontSize = 14;
    }
    

    return (
        <Button 
            title={title}
            titleStyle={[styles.titleStyle,{color:textColor,fontSize:fontSize},titleStyle]}
            containerStyle={[styles.containerStyle,{height:height},containerStyle]}
            buttonStyle={[styles.buttonStyle,{backgroundColor:bgColor,height:height},buttonStyle]}
            onPress={onPress}
            iconRight={iconRight}
            iconLeft={iconLeft}
            icon={props.icon}
            disabled={props.disabled}
            disabledStyle={[{borderColor:'#888'},props.disabledStyle]}
            disabledTitleStyle={[{color:'#888'},props.disabledTitleStyle]}
        />
    )
}

export default ButtonView

const styles = StyleSheet.create({
    containerStyle : {
        // height:48,
        // borderRadius:24
        // marginTop:20,
    },
    buttonStyle : {
        // height:48,
        borderRadius:8,
        borderWidth:1,
        padding:0,
        borderColor:colors.accent
    },
    titleStyle : {
        fontSize:16,
    }
})
