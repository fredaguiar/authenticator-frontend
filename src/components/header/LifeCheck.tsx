import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
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
          backgroundColor: 'rgb(197, 197, 197)',
        },
      ]}>
      <Text
        style={{
          fontWeight: '800',
          fontSize: 20,
        }}>
        {user?.firstName} {user?.lastName}
      </Text>
      <View style={[{}]}>
        <Text
          style={{
            fontWeight: '800',
            fontSize: 20,
          }}>
          Life check
        </Text>
        <View style={[{ display: 'flex', flexDirection: 'row' }]}>
          <Switch
            trackColor={{ false: '#767577', true: 'coral' }}
            thumbColor={lifeCheck ? 'red' : '#f4f3f4'}
            value={lifeCheck}
            onValueChange={() => setLifeCheck((val) => !val)}
          />
          <Text
            style={{
              fontWeight: '800',
              fontSize: 20,
            }}>
            {lifeCheck ? 'On' : 'Off'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LifeCheck;
