// import { useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';

const useSecureStore = () => {
  const setItem = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  };

  const getItem = async (key: string) => {
    const value = await SecureStore.getItemAsync(key);
    return value;
  };

  const deleteItem = async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  };

  return { setItem, getItem, deleteItem };
};

export default useSecureStore;
