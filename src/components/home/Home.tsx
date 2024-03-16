import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider, Input, Switch } from '@rneui/themed';
import SafeItem from './SafeItem';
import Bottom from './Bottom';
import { Picker } from '@react-native-picker/picker';
import { useAuthContext } from '../../context/AuthContext';
import { SORT_SAFE_BY } from '../../Const';

const App = () => {
  const { user } = useAuthContext();
  const [lifeCheck, setLifeCheck] = useState(false);
  const [search, setSearch] = useState('');
  const [sortSafe, setSortSafe] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View
          style={[
            {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 4,
            },
          ]}>
          <Text
            style={{
              fontWeight: '800',
              fontSize: 20,
            }}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: 'coral' }}
            thumbColor={lifeCheck ? 'red' : '#f4f3f4'}
            style={{}}
            value={lifeCheck}
            onValueChange={() => setLifeCheck((val) => !val)}
          />
        </View>
        <View style={[{ paddingTop: 10 }]}>
          <Input
            onChangeText={setSearch}
            value={search}
            placeholder="Search on files"
            keyboardType="ascii-capable"
            leftIcon={
              <MaterialCommunityIcons
                name="archive-search-outline"
                size={30}
                style={{ marginHorizontal: 5 }}
              />
            }
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
            }}>
            <Text style={{ fontSize: 18 }}>My Safes 9 of 10</Text>
            <Picker
              style={styles.dropDown}
              selectedValue={sortSafe}
              onValueChange={setSortSafe}
              mode="dropdown">
              {SORT_SAFE_BY.map((item) => (
                <Picker.Item key={item.value} label={item.label} value={item.value} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
      <Divider style={{ borderWidth: 1, borderColor: 'gray' }} />
      <ScrollView style={[styles.containerScrollView, { backgroundColor: 'white' }]}>
        <SafeItem safeName="BFF dd" />
        <SafeItem safeName="Family" />
        <SafeItem safeName="Personal documents. Year 2025 and 2026" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work" />
        <SafeItem safeName="Work LAST" />
      </ScrollView>

      <Bottom />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    height: 200,
  },
  containerScrollView: {
    flex: 1,
  },
  dropDown: {
    backgroundColor: 'white',
    width: 250,
    marginVertical: 10,
  },
});

export default App;
