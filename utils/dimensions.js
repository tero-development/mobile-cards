import {Dimensions} from 'react-native'

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

export default DeviceFractions