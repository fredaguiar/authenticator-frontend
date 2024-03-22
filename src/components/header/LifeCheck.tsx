import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch } from '@rneui/themed';
import { userProfileVar } from '../../cache';

const LifeCheck = () => {
  const [lifeCheck, setLifeCheck] = useState(false);
  const user = userProfileVar();

  return (
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
  );
};

const styles = StyleSheet.create({});

export default LifeCheck;
