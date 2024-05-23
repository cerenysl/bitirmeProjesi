import { StyleSheet, View, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { PLACES } from '../data/dummyData';
import PlaceItem from '../components/PlaceItem';
import SearchBar from '../components/SearchBar';

export default function PlaceScreen({ route, navigation }) {
  const ZoneId = route.params.ZoneId;
  const [places, setPlaces] = useState([]);
  const [searchResultMessage, setSearchResultMessage] = useState('');

  useEffect(() => {
    const initialPlaces = PLACES.filter(place => place.ZoneIds.includes(ZoneId));
    setPlaces(initialPlaces);
  }, [ZoneId]);

  const handleSearch = (text) => {
    if (text === '') {
      const filteredPlaces = PLACES.filter(place => place.ZoneIds.includes(ZoneId));
      setPlaces(filteredPlaces);
      setSearchResultMessage('');
    } else {
      const filteredPlaces = PLACES.filter(place =>
        place.ZoneIds.includes(ZoneId) &&
        place.title.toLowerCase().includes(text.toLowerCase())
      );
      setPlaces(filteredPlaces);
      setSearchResultMessage(filteredPlaces.length === 0 ? 'Arama sonucu bulunamadı.' : '');
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      {searchResultMessage !== '' && <Text style={styles.message}>{searchResultMessage}</Text>}
      <FlatList
        data={places}
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
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
    color: 'red',
  },
});
