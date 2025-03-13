export interface LATLNG {
  lat: number;
  lng: number;
}

export interface CALC_DISTANCE_RESPONSE {
  result: Array<CALC_DISTANCE_RESULT_DATA>;
  tod: boolean;
}

export interface CALC_DISTANCE_RESULT_DATA {
  id: number;
  stop_name: string;
  name: string;
  longitude: number;
  latitude: number;
  radius: number;
  is_tod: number;
  distance: number;
}

export interface GEOLOCATION_RESPONSE {
  result: GEOLOCATION_RESULT_DATA;
}

export interface GEOLOCATION_RESULT_DATA {
  type: string;
  name: string;
  crs: GEOLOCATION_CRS_TYPE;
  features: Array<GEOLOCATION_FEATURES_TYPE>;
}

export interface GEOLOCATION_CRS_TYPE {
  type: string;
  properties: GEOLOCATION_PROPRETIES_TYPE;
}

export interface GEOLOCATION_FEATURES_TYPE {
  type: string;
  properties: GEOLOCATION_PROPRETIES_TYPE;
  geometry: GEOLOCATION_FEATURES_GEOMETRY_TYPE;
}

export interface GEOLOCATION_PROPRETIES_TYPE {
  name?: string;
  TxtMemo?: string;
  SHAPE_Area?: number;
  分區?: string;
}

export interface GEOLOCATION_FEATURES_GEOMETRY_TYPE {
  type: string;
  coordinates: Array<Array<Array<number>>>;
}
