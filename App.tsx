import { NewAppScreen } from '@react-native/new-app-screen';
import { ActivityIndicator, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';
import LanguageSelector from './src/components/LanguageSelector';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home';
import Onboarding from './src/screens/Onboarding';
import PumpSignUp from './src/screens/PumpSignUp';
import AddFuel from './src/screens/Addfuel';
import ToastManager, { Toast } from 'toastify-react-native'

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const userType = useSelector(state => state.app.userType);
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}
      >
        {!userType ?
          <>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="PumpSignUp" component={PumpSignUp} />
          </>
          :
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddFuel" component={AddFuel} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

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
          <Navigation />
          <ToastManager />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
