import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Utils {
    static async fetchInformation(url) {
        try {
            let response = await fetch(url);
            if (response.status !== 200)
                return {};
            return await response.json();
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    static async getData(key){
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            console.log(e);
        }
    }

    static async storeData(key, value) {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.log(e);
        }
    }

    static async removeFromStorage(type, key) {
        let tmp = await Utils.getData(type);
        if (tmp !== null && key in tmp)
            delete tmp[key];
        await Utils.storeData(type, tmp);
    }

    static async addToStorage(type, key, data) {
        let tmp = await Utils.getData(type);
        if (tmp === null)
            tmp = {};
        tmp[key] = data;
        await Utils.storeData(type, tmp);
    }
}
