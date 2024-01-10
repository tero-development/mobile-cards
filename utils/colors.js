
const ColorGrader = (mode)=>{
    if(mode==='day'){
        return(
            {
                primaryColor: '#24BCB3',
                primaryColor100: '#BCEBE8',
                primaryColor200: '#97DEDA',
                primaryColor300: '#2ff3e8',
                secondaryColor300: '#63B0AC',
                secondaryColor400: '#008f99',
                secondaryColor: '#016B72',
                accentColor300:'#647190',
                accentColor400: '#525c75',
                accentColor: '#313849',
                // highlightColor: '#D9D9D9',               
                highlightColor: '#ffffff',
                errorColor: '#CD5C5C',
                activeColor: '#2E8B57',
                unselectedColor: '#6e6e6e'
            }
        )
    } else{
        return(
            {
                primaryColor100: '#222733',
                primaryColor200: '#313849',
                primaryColor300:'#424a5e',
                primaryColor: '#525c75',
                secondaryColor: '#43ded4',
                secondaryColor300: '#28807a',
                secondaryColor400: '#37b0a8',
                accentColor300: '#016B72',
                accentColor400: '#008f99',
                accentColor: '#63B0AC',
                highlightColor: '#199e97 ',
                errorColor: '#CD5C5C',
                activeColor: '#2E8B57'
            }
        )
    }
}

const Colors = ColorGrader('day')

//make this file into a functional Component, but that returns 
//this colors object ^ instead of a react-native component

// format for interpolating colors

// color: useAnimatedValue.interpolate({
//     inputRange: [0, 100],
//     outputRange: ['color1', 'color2']
// })

export default Colors    