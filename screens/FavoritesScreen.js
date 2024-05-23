import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { FavoritesContext } from '../store/favorites-context';
import { PLACES } from '../data/dummyData';
import PlaceItem from '../components/PlaceItem';
import SearchBar from '../components/SearchBar';

export default function FavoritesScreen({ navigation }) {
  const favoritePlaceContext = useContext(FavoritesContext);
  const [favoritePlaces, setFavoritePlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [searchResultMessage, setSearchResultMessage] = useState('');

  useEffect(() => {
    const initialFavorites = PLACES.filter((place) => favoritePlaceContext.ids.includes(place.id));
    setFavoritePlaces(initialFavorites);
    setFilteredPlaces(initialFavorites);
  }, [favoritePlaceContext.ids]);

  const handleSearch = (text) => {
    if (text === '') {
      setFilteredPlaces(favoritePlaces);
      setSearchResultMessage('');
    } else {
      const filteredFavorites = favoritePlaces.filter((place) =>
        place.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPlaces(filteredFavorites);
      setSearchResultMessage(filteredFavorites.length === 0 ? 'Arama sonucu bulunamadı.' : '');
    }
  };

  if (favoritePlaces.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>Favorilere herhangi bir mekan eklemediniz.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      {searchResultMessage !== '' && <Text style={styles.message}>{searchResultMessage}</Text>}
      <FlatList
        data={filteredPlaces}
        renderItem={({ item }) => (
          <PlaceItem
            id={item.id}
            title={item.title}
            address={item.address}
            social={item.social}
            imageUrl={item.imageUrl}
            color={item.color}
            pressFood={() => navigation.navigate('FoodOverview', { PlaceId: item.id })}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
    color: 'black',
    fontWeight: 'bold',
  },
});
