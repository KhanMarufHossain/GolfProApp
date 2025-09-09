// Simple storage wrapper using AsyncStorage when available.
// Falls back to in-memory storage if AsyncStorage is unavailable.
let AsyncStorage;
try {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  AsyncStorage = null;
}

const memoryStore = {};

const getItem = async (key) => {
  if (AsyncStorage) return AsyncStorage.getItem(key);
  return memoryStore[key] ?? null;
};

const setItem = async (key, value) => {
  if (AsyncStorage) return AsyncStorage.setItem(key, value);
  memoryStore[key] = value;
};

const removeItem = async (key) => {
  if (AsyncStorage) return AsyncStorage.removeItem(key);
  delete memoryStore[key];
};

export default { getItem, setItem, removeItem };
