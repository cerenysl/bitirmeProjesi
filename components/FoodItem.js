import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export default function FoodItem({
  id,
  title,
  imageUrl,
  affordability,
  complexity,
}) {
  return (
    <View style={styles.foodItem}>
      <Pressable>
        <View style={styles.innerView}>
          <View>
          {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
            <Text style={styles.title} > {title} </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailPrice}>{affordability}</Text>
            <Text style={styles.detailItem}><MaterialIcons name="local-restaurant" size={15} color="black" /> {complexity} </Text>
          </View>
        </View>
      </Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  foodItem:{
    margin: 15,
    backgroundColor: '#C8A2C8',
    elevation: 4,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
  },
  innerView:{},
  image:{
    width: '100%',
    height: 200,
    resizeMode: "contain",

  },
  title:{
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 8,
  },
  details:{},
  detailPrice:{
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  
  },
  detailItem:{
    textAlign: 'center',
    marginHorizontal: 4,
    fontSize: 14,
    margin: 8,
  },

});
