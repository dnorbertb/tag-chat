import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { StyleSheet, SafeAreaView, Platform, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import ChatLayout from './src/views/ChatLayout';
import { colors } from './src/styles/colors';

const Stack = createNativeStackNavigator();
const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Manrope: require('./src/assets/Fonts/Manrope.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={ChatLayout} />
        </Stack.Navigator>
        <StatusBar style="light" backgroundColor={colors.blue600} />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 40,
    backgroundColor: colors.blue600
  },
});
