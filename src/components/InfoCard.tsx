import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {FC, memo} from 'react';
import {
  CALC_DISTANCE_RESULT_DATA,
  GEOLOCATION_PROPRETIES_TYPE,
  LATLNG,
} from '../types';
import {LatLng} from 'react-native-maps';

interface Props {
  item: CALC_DISTANCE_RESULT_DATA | (LatLng & GEOLOCATION_PROPRETIES_TYPE);
  setPosition: (data: LATLNG) => void;
}

const InfoCard: FC<Props> = ({item, setPosition}) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        {item?.stop_name && (
          <View style={styles.margin}>
            <Text>Stop Name:</Text>
            <Text>{item?.stop_name}</Text>
          </View>
        )}

        {item?.name && (
          <View style={styles.margin}>
            <Text>Name:</Text>
            <Text>{item?.name}</Text>
          </View>
        )}

        {item?.longitude && item?.latitude && (
          <View style={styles.margin}>
            <Text>{`${item?.longitude}, ${item?.latitude}`}</Text>
          </View>
        )}

        {item?.['分區'] && (
          <View style={styles.margin}>
            <Text>分區:</Text>
            <Text>{item?.['分區']}</Text>
          </View>
        )}

        {item?.TxtMemo && (
          <View style={styles.margin}>
            <Text>TxtMemo: </Text>
            <Text>{item?.TxtMemo}</Text>
          </View>
        )}

        {item?.SHAPE_Area && (
          <View style={styles.margin}>
            <Text>SHAPE_Area: </Text>
            <Text>{item?.SHAPE_Area}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(InfoCard);

const styles = StyleSheet.create({
  container: {
    minHeight: 40,
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#888888',
  },
  margin: {marginVertical: 4},
});
