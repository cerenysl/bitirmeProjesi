import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import React from 'react';
import { FOODS } from '../data/dummyData';
import FoodItem from '../components/FoodItem';
import { useLayoutEffect, useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FavoritesContext } from '../store/favorites-context';
import CommentScreen from './CommentScreen';

export default function FoodOverviewScreen({ route, navigation }) {
  const favoritePlaceContext = useContext(FavoritesContext);
  const PlaceId = route.params.PlaceId;
  const displayedFoods = FOODS.filter((foodItem) => {
    return foodItem.PlaceIds.indexOf(PlaceId) >= 0;
  });

  const placeIsFavorite = favoritePlaceContext.ids.includes(PlaceId);

  const pressHandler = () => {
    console.log('Tıklandı');
  };

  const changeFavorite = () => {
    if (placeIsFavorite) {
      favoritePlaceContext.removeFavorite(PlaceId);
    } else {
      favoritePlaceContext.addFavorite(PlaceId);
    }
  };

  const goToCommentScreen = () => {
    navigation.navigate('CommentScreen', { placeId: PlaceId });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.headerRightContainer}>
            <Pressable onPress={goToCommentScreen}>
            <FontAwesome5 name="comment" size={24} marginRight={15} color="black" />
            </Pressable>
            <Pressable onPress={changeFavorite} style={({ pressed }) => (pressed ? styles.pressed : null)}>
              <MaterialIcons
                name={placeIsFavorite ? 'favorite' : 'favorite-outline'}
                size={24}
                color="black"
              />
            </Pressable>
          </View>
        );
      },
    });
  }, [navigation, changeFavorite]);

  function renderFoodItem(itemData) {
    const foodItemProps = {
      id: itemData.item.id,
      title: itemData.item.title,
      imageUrl: itemData.item.imageUrl,
      affordability: itemData.item.affordability,
      complexity: itemData.item.complexity,
    };

    return <FoodItem {...foodItemProps} />;
  }

  return (
    <View>
      <FlatList data={displayedFoods} keyExtractor={(item) => item.id.toString()} renderItem={renderFoodItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  pressed: {
    opacity: 0.5,
  },
});
