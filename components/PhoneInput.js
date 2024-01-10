import React, { useRef } from "react";
import {
  StyleSheet,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import Colors from "../utils/colors";
import DeviceFractions from "../utils/dimensions";

const PhoneInputComponent= ({value, setValue, disable, viewStyle}) => {
  const phoneInput = useRef(null);

  return (


          <PhoneInput
            containerStyle={[styles.container, viewStyle,  disable && styles.disabled]}
            textContainerStyle={[styles.textContainer, disable && styles.disabled]}
            textInputStyle={[styles.input, disable && styles.disabled]}
            ref={phoneInput}
            disabled={disable}
            defaultValue={value}
            defaultCode="US"
            layout="second"
            onChangeText={(text) => {
              setValue(text);
            }}
            
          />


  );
};

export default PhoneInputComponent;

const styles = StyleSheet.create({
  disabled:{
    borderColor: Colors.accentColor400,
    backgroundColor: Colors.accentColor300
  },
  container:{
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: Colors.secondaryColor,
    borderWidth: 2,
    borderRadius: 10
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: Colors.secondaryColor,
    borderLeftWidth: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10

  },
  input:{
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: Colors.secondaryColor,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: DeviceFractions.deviceW30,
    paddingVertical: DeviceFractions.deviceWidth / 200,
    fontSize: 12
  }

})