import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import DeviceFractions from '../utils/dimensions';
  import Colors from '../utils/colors';

  // const data = [
  //   { label: 'Item 1', value: '1' },
  //   { label: 'Item 2', value: '2' },
  //   { label: 'Item 3', value: '3' },
  //   { label: 'Item 4', value: '4' },
  //   { label: 'Item 5', value: '5' },
  //   { label: 'Item 6', value: '6' },
  //   { label: 'Item 7', value: '7' },
  //   { label: 'Item 8', value: '8' },
  // ];

  const DropdownComponent = ({data, mode, value, valueSetter, updater, flexWidth,  viewStyle, search, prompt, iconName, color, disable, deactivated}) => {
    const [isFocus, setIsFocus] = useState(false);

    const formattedData = data.map(entry =>{
      return {label: entry, value: entry}
    })

    const Standard = 
        <Dropdown
          disable={disable}
          mode={mode}
          style={[styles.dropdown, isFocus && { borderColor: Colors.activeColor, borderWidth: 3 }, disable   && styles.deactivated, {borderColor: color}]}
          placeholderStyle={[styles.textStyle, {color: color}]}
          selectedTextStyle={[styles.textStyle, {color: color}]}
          inputSearchStyle={[styles.inputSearchStyle, {borderColor: color}]}
          iconStyle={[styles.iconStyle, disable && {display: 'none'}]}
          data={formattedData}
          containerStyle={[styles.listContainer]}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? prompt : '...'}
          searchPlaceholder="Search..."
          itemTextStyle={styles.itemText}
          itemContainerStyle={styles.itemContainer}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            valueSetter(item.value, updater);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <Ionicons
              name={iconName}
              style={[styles.icon, color]}
              color={color}
              size={20}
            />
          )}
        />
      
        const Search = 
        <Dropdown
          mode={mode}
          style={[styles.dropdown, isFocus && { borderColor: Colors.activeColor, borderWidth: 3 }, {borderColor: color}]}
          placeholderStyle={[styles.textStyle, {color: color}]}
          selectedTextStyle={[styles.textStyle, {color: color}]}
          inputSearchStyle={[styles.inputSearchStyle, {borderColor: color}]}
          iconStyle={styles.iconStyle}
          data={formattedData}
          containerStyle={[styles.listContainer, {backgroundColor: color}]}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? prompt : '...'}
          searchPlaceholder="Search..."
          itemTextStyle={styles.itemText}
          itemContainerStyle={styles.itemContainer}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            valueSetter(item.value, updater);
            setIsFocus(false);
          }}
          search
          renderLeftIcon={() => (
            <Ionicons
              name={iconName}
              style={[styles.icon, color]}
              color={color}
              size={20}
            />
          )}
        />

    return (
      <View style={[styles.container, {flex: flexWidth}, viewStyle]}>
        {/* {renderLabel()} */}
        {search? Search : Standard}
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      padding: 0
    },
    dropdown: {
      height: DeviceFractions.deviceH20,
      borderColor: Colors.secondaryColor,
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      color: Colors.secondaryColor,
      left: DeviceFractions.deviceW30,
      top: -DeviceFractions.deviceHeight / 150,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    textStyle: {
      fontSize: 12,
      color: Colors.secondaryColor,
      fontWeight: 'bold'
    },
    iconStyle: {
      width: 20,
      height: 20
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    listContainer:{
      backgroundColor: Colors.primaryColor100,
      borderWidth: 0,
      borderRadius: 20,
      width: DeviceFractions.deviceWidth / 10 * 9,
      justifyContent: 'center',
      paddingVertical: '3%',
      paddingHorizontal: '3%'
    },
    itemText:{
      color: Colors.secondaryColor
    },
    itemContainer:{
      borderRadius: 10,
      backgroundColor: 'white',
      marginBottom: '2%',
      elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 8,
    },
    deactivated:{
      borderRadius: 0,
      borderWidth: 0,
      borderBottomWidth: 2
  }
  });