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
import Settings from './src/screens/Settings';
import ImagePreviewScreen from './src/screens/ImagePreviewScreen';
import VehicleSignUp from './src/screens/VehicleSignUp';
import QRScreen from './src/screens/QRScreen';
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
            <Stack.Screen name="PumpSignUp" component={PumpSignUp}
              options={{
                title:"আপনার পাম্পের তথ্য দিন",
                headerShown: true
              }}
              />
            <Stack.Screen name="VehicleSignUp" component={VehicleSignUp} 
              options={{
                title:"আপনার যানবাহনের তথ্য দিন",
                headerShown: true
              }}
            />

          </>
          :
          <>
            {userType === "pump" ?
            <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddFuel" component={AddFuel}
              options={{
              title:"জ্বালানি সরবরাহ শুরু করুন",
              headerShown: true
            }}
            />
            </>
            :
            <>
            <Stack.Screen name="QRScreen" component={QRScreen} />

            </>
            }
            
            <Stack.Screen name="Settings" component={Settings} options={{
              title:"সেটিংস",
              headerShown: true
            }} />
            <Stack.Screen name="ImagePreviewScreen" component={ImagePreviewScreen} />
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
          <ToastManager 
            position="bottom"
            showCloseIcon={false}
          />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
