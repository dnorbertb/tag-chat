import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { StyleSheet, Platform, View } from 'react-native';
import AppNavigator from './src/app/AppNavigator';
import { colors } from './src/styles/colors';


export default function App() {
  const [fontsLoaded] = useFonts({
    Manrope: require('./src/assets/Fonts/Manrope.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    // <NavigationContainer>
      <View style={styles.container}>
        {/* <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={AppNavigator} />
        </Stack.Navigator> */}
        <AppNavigator />
        <StatusBar style="light" backgroundColor={colors.blue600} />
      </View>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 40,
    backgroundColor: colors.blue600
  },
});
