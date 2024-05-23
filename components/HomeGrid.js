import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

export default function HomeGrid({ title, color, pressPlace }) {
  return (
    <View style={styles.container}>
      <View style={styles.gridItem}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={pressPlace}
        >
          <View style={[styles.insideView, { backgroundColor: color }]}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5DC',
    flex: 1,
  },
  gridItem: {
    backgroundColor: '#F5F5DC',
    flex: 1,
    height: 150,
    margin: 15,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  button: {
    flex: 1,
  },
  insideView: {
    flexGrow: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
