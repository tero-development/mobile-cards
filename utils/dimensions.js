import {Dimensions, StyleSheet, useWindowDimensions} from 'react-native'

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

const DeviceFractions = {
    deviceWidth: deviceWidth,
    deviceHeight: deviceHeight,
    deviceH10 : deviceHeight / 10,
    deviceH20 : deviceHeight / 20,
    deviceH30 : deviceHeight / 30,
    deviceH40 : deviceHeight / 40,
    deviceH50 : deviceHeight / 50,
    deviceW10 : deviceWidth / 10,
    deviceW20 : deviceWidth / 20,
    deviceW30 : deviceWidth / 30,
    deviceW40 : deviceWidth / 40,
    deviceW50 : deviceWidth / 50,
}

export function getDimensions(){
    const {width, height} = useWindowDimensions()
    return({
        width: width,
        height: height
    })
}

//should be fed the 2 parameters from the using component's
//invocation of useWindowDimensions
export function converterSetup(width, height){
    const targetDimensions = {width: width, height: height}

    function converter(style1, style2, style3){
        const {width, height} = targetDimensions
    
        let style
        if(width < 400){
            style = style1
            return style
        }
        if(width < 600){
            style = style2
            return style
        }
        // if(width < 750){
        //     style = style3
        //     return style
        // }
        if(width < 900){
            style = style3
            return style
        }
        else{
            style = style1
            return style
        }
    
    }

    return converter
}

export function useStyles(styleObject){

    return StyleSheet.create(styleObject)
}

export default DeviceFractions