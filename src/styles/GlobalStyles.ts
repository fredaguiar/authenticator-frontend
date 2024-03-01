import { StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
  SkyBackground: {
    backgroundColor: '#DFE9ED',
  },
  SkyBackgroundDark: {
    backgroundColor: '#96d5ee',
  },
  ImageStreet: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
});
