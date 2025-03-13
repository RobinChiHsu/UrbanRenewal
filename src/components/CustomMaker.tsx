import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Svgs} from '../assets';
import {useReactiveVar} from '@apollo/client';
import {__userFBInfo__, __userInfo__} from '../graphql/policies';

interface Props {
  isShowTip: boolean;
}

const CustomMaker = ({isShowTip}: Props) => {
  const userInfo = useReactiveVar(__userInfo__);
  const userFBInfo = useReactiveVar(__userFBInfo__);
  return (
    <View style={styles.container}>
      {isShowTip && (
        <View style={styles.thumbnailsContainer}>
          <View style={styles.thumbnails}>
            {userInfo?.data?.user?.photo && (
              <Image
                source={{uri: userInfo?.data?.user?.photo}}
                style={styles.image}
                resizeMode="contain"
              />
            )}
          </View>
          <View style={styles.thumbnails}>
            {userFBInfo?.imageURL && (
              <Image
                source={{uri: userFBInfo?.imageURL}}
                style={styles.image}
                resizeMode="contain"
              />
            )}
          </View>
        </View>
      )}
      <Svgs.Pin height={48} width={48} />
    </View>
  );
};

export default CustomMaker;

const styles = StyleSheet.create({
  container: {alignItems: 'center'},
  thumbnailsContainer: {flexDirection: 'row', marginBottom: 8},
  thumbnails: {
    width: 24,
    height: 24,
    borderRadius: 16,
    marginHorizontal: 2,
  },
  image: {width: '100%', height: '100%', borderRadius: 16},
});
