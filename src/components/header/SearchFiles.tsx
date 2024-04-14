import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, SearchBar } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import { SORT_SAFE_BY } from '../../Const';
import { useReactiveVar } from '@apollo/client';
import { safeIdVar, userProfileVar } from '../../cache';
import { SafeUtil } from '../../utils/SafeUtil';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { PrivateRootStackParams } from '../../nav/RootNavigator';

const SearchFiles = () => {
  const [search, setSearch] = useState('');
  const [sortSafe, setSortSafe] = useState('');
  const navigation = useNavigation<NavigationProp<PrivateRootStackParams>>();
  const user = useReactiveVar(userProfileVar);
  const safe = SafeUtil.getSafe(user, useReactiveVar(safeIdVar));

  const updateSearch = (search: string) => {
    // setSearch(search);
    // const filtered = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    // setFilteredData(filtered);
  };

  return (
    <View style={[{ paddingTop: 10 }]}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          paddingHorizontal: 5,
          marginVertical: 20,
        }}>
        {safe && (
          <MaterialCommunityIcons
            name="arrow-left-bold"
            size={40}
            style={{}}
            onPress={() => {
              safeIdVar(null);
            }}
          />
        )}
        <SearchBar
          onChangeText={setSearch}
          value={search}
          placeholder="Search on files"
          containerStyle={{
            width: 350,
            maxHeight: 65,
            backgroundColor: 'white',
            borderRadius: 10,
            borderColor: '#cccccc',
            borderWidth: 1,
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
          style={{
            backgroundColor: 'white',
            fontSize: 22,
            color: 'black',
            textDecorationLine: 'none',
            borderBottomWidth: 0,
          }}
          inputContainerStyle={{ backgroundColor: 'white' }}
        />
      </View>
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AutoSharingSetup', { safeId: safe._id });
              }}
              style={{}}>
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
