import { StyleSheet, Text, View, Pressable, Image, Linking } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';

export default function PlaceItem({
  id,
  title,
  pressFood,
  color,
  address,
  imageUrl,
  social,
}) {
  const handlePressSocial = () => {
    Linking.openURL(social);
  };

  const handlePressAddress = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={styles.placeItem}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={pressFood}
      >
        <View style={styles.innerView}>
          <View>
            {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
            <Text style={styles.title}>{title}</Text>
          </View>
          <Pressable onPress={handlePressAddress}>
            <Text style={styles.mapLink}>
            <Entypo name="address" size={24} color="black" /> Haritalarda Görüntüle
            </Text>
          </Pressable>
          <Pressable onPress={handlePressSocial}>
            <Text style={styles.social}>
              <Entypo name="instagram" size={18} color="black" /> Instagram'da Görüntüle
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  placeItem: {
    margin: 15,
    backgroundColor: '#C8A2C8',
    elevation: 4,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
  },
  innerView: {},
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 8,
  },
  mapLink: {
    textAlign: 'center',
    fontSize: 15,
    margin: 8,
    color: 'black',
    fontWeight: 'bold',
    // textDecorationLine: 'underline', 
  },
  social: {
    textAlign: 'center',
    fontSize: 15,
    margin: 8,
    fontWeight: 'bold',
    color: 'black', 
    // textDecorationLine: 'underline', 
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
