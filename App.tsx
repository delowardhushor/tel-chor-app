import { NewAppScreen } from '@react-native/new-app-screen';
import { ActivityIndicator, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';
import LanguageSelector from './src/components/LanguageSelector';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home';
import Onboarding from './src/screens/Onboarding';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }} >

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
              <ActivityIndicator size="large" />
              <Text style={{ fontSize: 20 }} > Loading...</Text>
            </View>
          </View>
        }
        persistor={persistor}
      >
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Onboarding"
            screenOptions={{
              headerShown: false
            }}
            >
              <Stack.Screen name="Onboarding" component={Onboarding} />
              <Stack.Screen name="Home" component={Home} />
              {/* <Stack.Screen name="Details" component={Home} /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
