import React, { useState } from 'react';
  import { View, useWindowDimensions } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import {converterSetup, useStyles} from '../utils/dimensions';
  import Colors from '../utils/colors';


  const DropdownComponent = ({data, mode, value, valueSetter, updater, dropStyle, viewStyle, search, prompt, iconName, color, disable, deactivated}) => {
    const [isFocus, setIsFocus] = useState(false);

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
    
      dropdown: {
        width: converter(width/2, width/1.6, width/2),
        height: height /20,
        borderWidth: converter(1.5, 2, 3),
        borderRadius: converter(6, 8, 12),
        paddingHorizontal: converter(width/40, width/30, width/40),
        fontSize: 16,
        marginBottom:converter(height/50, height/40, height/50)
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        color: Colors.secondaryColor,
        left: width/30,
        top: -height / 150,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: converter(width/35, width/25, width/35)
      },
      textStyle: {
        fontSize: converter(width/35, width/30, width/35),
        color: 'Colors.secondaryColor',
        fontWeight: 'bold'
      },
      iconStyle: {
        width: 20,
        height: 20
      },
      inputSearchStyle: {
        height: 40,
        fontSize: converter(width/35, width/25, width/35)
      },
      listContainer:{
        backgroundColor: Colors.primaryColor100,
        borderWidth: 0,
        borderRadius: converter(10, 15, 20),
        justifyContent: 'center',
        paddingVertical: '3%',
        paddingHorizontal: '3%'
      },
      itemText:{
        color: Colors.secondaryColor,
        fontSize: converter(width/35, width/25, width/35)

      },
      itemContainer:{
        borderRadius: converter(6, 8, 12),
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
    }
 
    const styles = useStyles(localStyles)

    const formattedData = data.map(entry =>{
      return {label: entry, value: entry}
    })

    const Standard = 
        <Dropdown
          disable={disable}
          mode={mode}
          style={[styles.dropdown, dropStyle, isFocus && { borderColor: Colors.activeColor, borderWidth: 3 }, disable   && styles.deactivated, {borderColor: color}]}
          placeholderStyle={[styles.textStyle, {color: color}]}
          selectedTextStyle={[styles.textStyle, {color: color}]}
          inputSearchStyle={[styles.inputSearchStyle, {borderColor: color}]}
          iconStyle={[styles.iconStyle, disable && {display: 'none'}]}
          data={formattedData}
          containerStyle={styles.listContainer}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? prompt : '...'}
          searchPlaceholder="Search..."
          itemTextStyle={styles.itemText}
          itemContainerStyle={[styles.itemContainer]}
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
              size={converter(16, 20, 30)}
            />
          )}
        />
      
        const Search = 
        <Dropdown
          mode={mode}
          style={[styles.dropdown,dropStyle, isFocus && { borderColor: Colors.activeColor, borderWidth: 3 }, {borderColor: color}]}
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
              size={converter(16, 20, 30)}
            />
          )}
        />

    return (
      <View style={[styles.container, viewStyle]}>
        {/* {renderLabel()} */}
        {search? Search : Standard}
      </View>
    );
  };

  export default DropdownComponent;

