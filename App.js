import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import FoodOverviewScreen from './screens/FoodOverviewScreen';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import HomeScreen from './screens/HomeScreen';
import { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PlaceScreen from './screens/PlaceScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FavoritesScreen from './screens/FavoritesScreen';
import { MaterialIcons } from '@expo/vector-icons';
import FavoritesContextProvider from './store/favorites-context';
import { LogBox } from 'react-native';
import CommentScreen from './screens/CommentScreen';

LogBox.ignoreAllLogs(true);

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const authContext = useContext(AuthContext);
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#F5F5DC',
          width: 240,
        },
        headerStyle: { backgroundColor: '#C8A2C8' },
        drawerActiveBackgroundColor: '#C8A2C8',
        drawerActiveTintColor: 'black',
        sceneContainerStyle: { backgroundColor: '#F5F5DC' },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: () => (
            <MaterialIcons name="category" size={24} color="black" />
          ),
          title: 'Kategoriler',
          headerRight: ({ tintColor }) => (
            <Pressable
              style={({ pressed }) => pressed && styles.pressed}
              onPress={authContext.logout}
            >
              <Ionicons name="exit" size={24} color={tintColor} />
            </Pressable>
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favoriler',
          drawerIcon: () => (
            <MaterialIcons name="favorite" size={24} color="black" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function NormalStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#C8A2C8' },
        headerTintColor: 'black',
        contentStyle: { backgroundColor: '#F5F5DC' },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTitle: 'Kullanıcı Giriş' }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerTitle: 'Kullanıcı Kayıt' }}
      />
    </Stack.Navigator>
  );
}

function AfterAuthenticatedStack() {
  return (
    <FavoritesContextProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#F5F5DC' },
          headerTintColor: 'black',
          contentStyle: { backgroundColor: '#F5F5DC' },
        }}
      >
        <Stack.Screen
          name="Kategoriler"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Place"
          component={PlaceScreen}
          options={{ headerTitle: 'Mekanlar', headerStyle: { backgroundColor: '#C8A2C8' } }}
        />
        <Stack.Screen
          name="FoodOverview"
          component={FoodOverviewScreen}
          options={{ headerTitle: 'MENÜ', headerStyle: { backgroundColor: '#C8A2C8' } }}
        />
        <Stack.Screen
          name="CommentScreen"
          component={CommentScreen}
          options={{ headerTitle: 'Yorumlar', headerStyle: { backgroundColor: '#C8A2C8' } }}
        />
      </Stack.Navigator>
    </FavoritesContextProvider>
  );
}

function Navigation() {
  const authContext = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authContext.isAuthenticated ? <NormalStack /> : <AfterAuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {

  return (
    <AuthContextProvider>
      <View style={styles.appContainer}> 
        <Navigation />
      </View>
    </AuthContextProvider>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PlaceScreen" component={PlaceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FoodOverview" component={FoodOverviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );


}

const styles = StyleSheet.create({
  pressed:{
    opacity:0.5,
  },
  logo: {
    width: 150, 
    height: 50, 
    marginLeft: 10, 
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#F5F5DC', 
  },
});
