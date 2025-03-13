import axios from 'axios';
import {LATLNG, CALC_DISTANCE_RESPONSE, GEOLOCATION_RESPONSE} from '../types';
import {API_GOOGLE_KEY, API_HOST} from '@env';

export async function calcDistancePostApi(
  data: LATLNG,
): Promise<CALC_DISTANCE_RESPONSE | null | undefined> {
  try {
    const response = await axios.post(`${API_HOST}calc-distance`, data, {
      headers: {
        accept: 'application/json',
      },
    });

    return response.data;
  } catch (error: unknown | any) {
    return error.response.data;
  }
}

export async function getAddressApi(
  address: string,
): Promise<any | null | undefined> {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_GOOGLE_KEY}`,
      {
        headers: {
          accept: 'application/json',
        },
      },
    );

    return response.data;
  } catch (error: unknown | any) {
    return error.response.data;
  }
}

export async function getGeolocationApi(): Promise<
  GEOLOCATION_RESPONSE | null | undefined
> {
  try {
    const response = await axios.get(
      `${API_HOST}geolocation-json?directory=tucheng.json`,
      {
        headers: {
          accept: 'application/json',
        },
      },
    );

    return response.data;
  } catch (error: unknown | any) {
    return error.response.data;
  }
}
