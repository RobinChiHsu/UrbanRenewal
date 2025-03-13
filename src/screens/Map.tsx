import {
  Keyboard,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MapView, {
  LatLng,
  Marker,
  Polygon,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import CustomMaker from '../components/CustomMaker';
import Geolocation from '@react-native-community/geolocation';
import {calcDistancePostApi, getAddressApi, getGeolocationApi} from '../api';
import {LATLNG, CALC_DISTANCE_RESPONSE, GEOLOCATION_RESPONSE} from '../types';
import {SafeAreaView} from 'react-native-safe-area-context';

const Map = () => {
  const [isShowTip, setIsShowTip] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [position, setPosition] = useState({lat: 121.504603, lng: 24.993955});
  const [inputValue, setInputValue] = useState('');
  const [calcDistance, setCalcDistance] =
    useState<CALC_DISTANCE_RESPONSE | null>(null);
  const [geolocation, setGeolocation] = useState<GEOLOCATION_RESPONSE | null>(
    null,
  );
  const [polygons, setPolygons] = useState<Array<{cordinates: Array<LatLng>}>>(
    [],
  );

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      error => console.error(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const handleCalcDistance = useCallback(async () => {
    const response = await getAddressApi(inputValue.trim());
    const data: LATLNG = response?.results[0]?.geometry?.location;

    const result = await calcDistancePostApi(data);
    if (result) {
      setPosition({
        lat: result?.result?.[0]?.latitude || 0,
        lng: result?.result?.[0]?.longitude || 0,
      });
      setCalcDistance(result);
    }
  }, [inputValue]);

  const handleGeolocation = async () => {
    const response = await getGeolocationApi();
    if (response) {
      setGeolocation(response);
    }
  };

  // 計算 Polygon 中心點
  const calculateCentroid = (coordinates: Array<LatLng>) => {
    let totalLat = 0,
      totalLng = 0;
    let numPoints = coordinates.length;

    coordinates.forEach(coord => {
      totalLat += coord.latitude;
      totalLng += coord.longitude;
    });

    return {
      latitude: totalLat / numPoints,
      longitude: totalLng / numPoints,
    };
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('定位權限被拒絕');
          return;
        }
      }

      getCurrentLocation();
    };

    const fetch = async () => {
      await requestLocationPermission();
    };
    fetch();
  }, []);

  useEffect(() => {
    const formattedPolygons = geolocation?.result?.features?.map(feature => {
      const cordinates = feature?.geometry?.coordinates[0]?.map(cord => ({
        latitude: cord[1],
        longitude: cord[0],
      }));

      return {
        cordinates,
      };
    });

    if (formattedPolygons) {
      setPolygons(formattedPolygons);
      setPosition({
        lat: formattedPolygons?.[0]?.cordinates?.[0]?.latitude,
        lng: formattedPolygons?.[0]?.cordinates?.[0]?.longitude,
      });
    }
  }, [geolocation]);

  useEffect(() => {
    const onShowKeyboard = Keyboard.addListener('keyboardDidShow', () => {
      setIsShowKeyboard(true);
    });

    return () => {
      onShowKeyboard.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        pointerEvents={isShowKeyboard ? 'auto' : 'none'}
        onPress={() => {
          Keyboard.dismiss();
          setIsShowKeyboard(false);
        }}
        style={styles.disKeyboardBtn}
      />
      <View style={styles.topView}>
        <View style={styles.inputView}>
          <TextInput
            placeholder="輸入經緯度"
            placeholderTextColor="#888888"
            value={inputValue}
            onChangeText={v => setInputValue(v)}
          />
        </View>
        <TouchableOpacity onPress={handleCalcDistance}>
          <View style={styles.searchBtn}>
            <Text>搜尋</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.geolocationBtn}>
        <TouchableOpacity onPress={handleGeolocation}>
          <View style={styles.searchBtn}>
            <Text>Get Geolocation</Text>
          </View>
        </TouchableOpacity>
      </View>
      <MapView
        loadingEnabled
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        onPress={e =>
          setPosition({
            lat: e.nativeEvent.coordinate.latitude,
            lng: e.nativeEvent.coordinate.longitude,
          })
        }
        showsUserLocation={true}
        region={{
          latitude: position.lat,
          longitude: position.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {calcDistance?.result?.map(item => (
          <Marker
            key={item.id}
            onPress={() => setIsShowTip(!isShowTip)}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}>
            <CustomMaker isShowTip={isShowTip} />
          </Marker>
        ))}

        {polygons?.map((polygon, index) => {
          const centroid = calculateCentroid(polygon.cordinates);
          return (
            <View key={index}>
              <Marker
                onPress={() => setIsShowTip(!isShowTip)}
                coordinate={centroid}>
                <CustomMaker isShowTip={isShowTip} />
              </Marker>
              <Polygon
                coordinates={polygon.cordinates}
                strokeColor="blue"
                fillColor="rgba(0, 0, 255, 0.3)"
                strokeWidth={2}
              />
            </View>
          );
        })}
      </MapView>
    </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {flex: 1},
  map: {
    flex: 1,
    position: 'relative',
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
  inputView: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#333333',
    marginBottom: 16,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchBtn: {
    height: 44,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#333333',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  geolocationBtn: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 16,
  },
  disKeyboardBtn: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 10,
    bottom: 0,
  },
});
