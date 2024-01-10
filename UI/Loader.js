import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Loader = ({size, color}) => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Loader;