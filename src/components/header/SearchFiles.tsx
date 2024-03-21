import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import { SORT_SAFE_BY } from '../../Const';

const SearchFiles = () => {
  const [search, setSearch] = useState('');
  const [sortSafe, setSortSafe] = useState('');

  return (
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
  );
};

const styles = StyleSheet.create({
  dropDown: {
    backgroundColor: 'white',
    width: 250,
    marginVertical: 10,
  },
});

export default SearchFiles;
