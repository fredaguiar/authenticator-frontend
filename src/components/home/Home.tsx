import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Divider } from '@rneui/themed';
import SafeList from '../safe/SafeList';
import Bottom from '../bottom/Bottom';
import LifeCheck from '../header/LifeCheck';
import SearchFiles from '../header/SearchFiles';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <LifeCheck />
        <SearchFiles />
      </View>
      <Divider style={{ borderWidth: 1, borderColor: 'gray' }} />
      <View style={[styles.containerScrollView, { backgroundColor: 'white' }]}>
        <SafeList />
      </View>
      <Bottom />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    height: 'auto',
  },
  containerScrollView: {
    flex: 1,
  },
});

export default Home;
