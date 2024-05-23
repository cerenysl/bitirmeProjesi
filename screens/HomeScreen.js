import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { ZONES } from '../data/dummyData';
import HomeGrid from '../components/HomeGrid';

export default function HomeScreen({ navigation }) {
  function renderZoneItem(itemData) {
    function pressHandler() {
      navigation.navigate('Place', {
        ZoneId: itemData.item.id,
      });
    }

    console.log(itemData.item);
    return (
      <HomeGrid
        title={itemData.item.title}
        color={itemData.item.color}
        pressPlace={pressHandler}
      />
    );
  }

  return (
    <FlatList
      data={ZONES}
      keyExtractor={(item) => item.id}
      renderItem={renderZoneItem}
      numColumns={1}
    />
  );
}

const styles = StyleSheet.create({
  pressed:{
    opacity: 0.5,
  },
});

