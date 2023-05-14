import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { View, StyleSheet, Platform } from 'react-native';
import AppNavigator from './src/app/AppNavigator';
import { colors } from './src/styles/colors';
import { Provider } from 'react-redux';
import { appDataStore } from './src/store/store';
import {
  requestPermissionsAsync,
  setNotificationHandler,
} from 'expo-notifications';
import { useEffect } from 'react';

// Notifications config
setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Permisions handler function
async function handleiOSPermissions() {
  await requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Manrope: require('./src/assets/Fonts/Manrope.ttf'),
  });

  // iOS notifications permissions handler
  useEffect(() => {
    handleiOSPermissions();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <Provider store={appDataStore}>
      <View style={styles.container}>
        <AppNavigator />
        <StatusBar style="light" backgroundColor={colors.blue600} />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 40,
    backgroundColor: colors.blue600,
  },
});
