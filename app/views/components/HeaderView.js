import React, { Fragment } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { images } from '../../assets/images';
import { colors } from '../../values/colors';
import ButtonView from './ButtonView';

const HeaderView = props => {

    const {
        headerParentStyle,
        hasBack,onBackPress,
        hasMenu, onMenuPress,
        hasTitle = true,title,
        tintColor=colors.headerTintColor,
    } = props;



    return (
        <View style={[styles.parent,headerParentStyle]}>
            
            {
                hasBack
                &&
                <TouchableOpacity 
                    style={styles.headerView}
                    onPress={onBackPress}>
                <Icon 
                    name={'arrow-back-ios'}
                    type={'material'}
                    color={tintColor}
                />
                </TouchableOpacity>
            }

            {
                hasMenu
                &&
                <TouchableOpacity 
                    style={styles.headerView}
                    onPress={onMenuPress}>
                    <Icon 
                        name={'menu'}
                        type={'feather'}
                        color={tintColor}
                    />
                </TouchableOpacity>
            }
            
            {
                hasTitle
                &&
                <Text style={[styles.titleStyle,{color:tintColor}]}>{title}</Text>
            }
            
            <View style={styles.notificationView}>
                {
                    props.rightComponent
                }
            </View>
        </View>
    )
}

export default HeaderView

const styles = StyleSheet.create({
    parent : {
        height : 56,
        backgroundColor: colors.headerColor,
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:12,
        borderBottomLeftRadius:6,
        borderBottomRightRadius:6
    },
    headerView : {
        position: 'absolute',
        padding:16,
        left:0,
        zIndex: 100,
        paddingVertical:8,
        // paddingHorizontal:16,
        paddingRight:16,
        paddingLeft:8
    },
    titleStyle : {
        flex:1,
        color:colors.headerTintColor,
        textAlign:'center',
        fontSize:16,
        fontWeight:'700'
    },
    notificationView : { 
        position: 'absolute',
        // padding:12,
        right:0,
        zIndex: 100
    },
})
