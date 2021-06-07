import * as Location from 'expo-location';
import axios from "axios";
import { baseFetch } from './baseFetch';
import { BaseFetchRes } from '@types';

export const getCoordinate = async() =>{
    await Location.requestPermissionsAsync();
    return await Location.getCurrentPositionAsync();
}

export const getRegion =async(latitude: number, longitude: number) =>{

    // const { data: { results } } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=AIzaSyA-4i3FV1KLsJbsyVySpYi4YIwxIkEXFlw`);

    //         let fullAddress = results[0].formatted_address
    //         let splitAddress = fullAddress.split(" ");

    //         if (splitAddress[1].charAt(splitAddress.length - 1) === "시") {
    //             return splitAddress[1]
    //         }
    //         else {
    //             return splitAddress[2]
    //         }

    await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=AIzaSyA-4i3FV1KLsJbsyVySpYi4YIwxIkEXFlw`);
    // return baseFetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=AIzaSyA-4i3FV1KLsJbsyVySpYi4YIwxIkEXFlw`, "GET");

}