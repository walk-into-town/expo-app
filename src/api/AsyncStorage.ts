import AsyncStorage from "@react-native-async-storage/async-storage";
import { isJsonString } from "./util";

const setStorage = async (key: string, value: string | object) => {
  try {
    const jsonValue = typeof value === "string" ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getStorage = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);

    if (!jsonValue) return null;

    if (isJsonString(jsonValue)) return JSON.parse(jsonValue);
    
    return jsonValue;
  } catch (e) {
    console.log(e);
  }
};

const rmStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

export { setStorage, getStorage, rmStorage };
