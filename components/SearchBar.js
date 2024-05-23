import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Arama terimini yolla
  const handleSearch = (text) => {
    setSearchTerm(text);
    onSearch(text);
  };

  const clearSearch = () => {
    setSearchTerm(''); 
    onSearch(''); 
  };

  return (
    <View style={styles.backgroundStyle}>
    <FontAwesome style={styles.iconStyle} name="search" size={24} color="black" />
      <TextInput style={styles.inputStyle}
        placeholder="Mekan arayın..."
        onChangeText={handleSearch}
        value={searchTerm}
      />
      {/* Arama çubuğunu temizlemek için bir temizleme düğmesi */}
      {searchTerm.length > 0 && (
        <TouchableOpacity onPress={clearSearch} style={{ padding: 10 }}>
          <Feather name="delete" size={20} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    backgroundStyle:{
      backgroundColor: '#C8A2C8',
      flexDirection: 'row',
      margin: 10,
      height: 40,
      alignItems: 'center',
      borderRadius: 20,
    },
    iconStyle:{
      marginHorizontal: 15, 
    },
    inputStyle:{
      flex: 1, 
      fontSize: 18,
    },
  })

export default SearchBar;
