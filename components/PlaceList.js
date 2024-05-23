import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { PLACES } from '../data/dummyData';
import PlaceScreen from '../screens/PlaceScreen';
import PlaceItem from './PlaceItem';
import FavoritesScreen from '../screens/FavoritesScreen';

export default function PlaceList({items,navigation}) {
    function renderPlaceItem(itemData) {
        function pressHandler() {
            navigation.navigate('FoodOverview', {
              PlaceId: itemData.item.id,
            });
          }
        console.log(itemData.item);
        const placeItemProps = {
          id: itemData.item.id,
          title: itemData.item.title,
          color: itemData.item.title,
          imageUrl: itemData.item.imageUrl,
          address: itemData.item.address,
          social: itemData.item.social,
        };
        return <PlaceItem {...placeItemProps} 
        pressFood={pressHandler}
        />;
}
    return(
        <View>
        <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderPlaceItem}
        />
    </View>
    );

}

const styles = StyleSheet.create({})




