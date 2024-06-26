import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, useTheme } from '@rneui/themed';
import SafeList from '../safe/SafeList';
import Bottom from '../bottom/Bottom';
import LifeCheck from '../header/LifeCheck';
import SearchFiles from '../header/SearchFiles';
import { useReactiveVar } from '@apollo/client';
import { SafeUtil } from '../../utils/SafeUtil';
import { safeIdVar, userProfileVar } from '../../cache';
import ItemList from '../safe/ItemList';

const Home = () => {
  const {
    theme: { colors },
  } = useTheme();
  const user = useReactiveVar(userProfileVar);
  const safe = SafeUtil.getSafe(user, useReactiveVar(safeIdVar));

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <LifeCheck />
        <SearchFiles />
      </View>
      <Divider style={{ borderWidth: 1, borderColor: colors.divider2 }} />
      <View style={[styles.containerScrollView, { backgroundColor: colors.background }]}>
        {!safe ? <SafeList /> : <ItemList />}
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
