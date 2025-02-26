import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import IndexScreen from './src/screens/IndexScreen';
import CrimeDetailScreen from './src/screens/CrimeDetailScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { SettingsProvider } from './src/context/SettingsContext';

const Stack = createStackNavigator();

function App() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Index">
          <Stack.Screen
            name="Index"
            component={IndexScreen}
            options={({ navigation }) => ({
              title: 'Criminal Intent',
              headerRight: () => (
                <View style={styles.headerRightContainer}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Settings')}
                    style={styles.headerButton}
                  >
                    <MaterialCommunityIcons name="cog" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('CrimeDetail', { id: undefined })}
                    style={styles.headerButton}
                  >
                    <MaterialCommunityIcons name="plus" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              ),
              headerLeft: () => null,
            })}
          />
          <Stack.Screen
            name="CrimeDetail"
            component={CrimeDetailScreen}
            options={({ navigation }) => ({
              title: 'Crime Detail',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Settings')}
                  style={styles.headerButton}
                >
                  <MaterialCommunityIcons name="cog" size={24} color="white" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: 10,
  },
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 5,
  },
});

export default App;