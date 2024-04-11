import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Input } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import { SORT_SAFE_BY } from '../../Const';
import { useReactiveVar } from '@apollo/client';
import { safeIdVar, userProfileVar } from '../../cache';
import { SafeUtil } from '../../utils/SafeUtil';
import { IconButton } from '../ui/IconButtons';

const SearchFiles = () => {
  const [search, setSearch] = useState('');
  const [sortSafe, setSortSafe] = useState('');

  const user = useReactiveVar(userProfileVar);
  const safe = SafeUtil.getSafe(user, useReactiveVar(safeIdVar));

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
      {!safe && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
            marginBottom: 10,
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
      )}
      {safe && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: 10,
          }}>
          <MaterialCommunityIcons name="treasure-chest" size={50} style={{ marginRight: 5 }} />
          <Text style={{ marginRight: 20, fontSize: 20 }}>{safe.name}</Text>
          <View style={{}}>
            <TouchableOpacity onPress={() => {}} style={{}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#f77272',
                  padding: 5,
                  borderRadius: 10,
                }}>
                <MaterialCommunityIcons name="arrow-left-bold-circle" size={40} />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Set auto-share</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
