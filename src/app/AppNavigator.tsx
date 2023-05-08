// Base
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import type {
  BottomTabNavigationOptions,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  mdiTagTextOutline,
  mdiChatProcessingOutline,
  mdiSendVariantOutline,
  mdiAccountGroupOutline,
  mdiTagText,
  mdiChatProcessing,
  mdiAccountGroup,
  mdiSquareRounded,
  mdiSquareRoundedOutline,
} from '@mdi/js';

// Components
import Icon from '../components/Icon';

// Styles
import { colors } from '../styles/colors';

// Views
import ChatsView from './ChatsView/ChatsView';
import ContactsView from './ContactsView/ContactsView';
import StartChatView from './StartChatView/StartChatView';
import MenuView from './MenuView/MenuView';
import TagsView from './TagsView/TagsView';
import ConversationView from './ConversationView/ConversationView';
import RegisterView from './RegisterView/RegisterView';

// Navigators
export type RootStackParamList = {
  Home: undefined;
  App: undefined;
  Conversation: { id: number };
  StartChat: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type TabStackParamList = {
  Tags: undefined;
  Chats: undefined;
  NewChat: undefined;
  Contacts: undefined;
  Menu: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

function TabNavigator({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const TabNavigatorScreenOptions: (
    props: BottomTabScreenProps<TabStackParamList>
  ) => BottomTabNavigationOptions = (props) => ({
    tabBarStyle: {
      height: Platform.OS === 'ios' ? 90 : 70,
    },
    headerShown: false,
    tabBarLabel: () => '',
    tabBarIcon: ({ focused, color, size }) => {
      const labels = {
        Tags: 'Tags',
        Chats: 'Chats',
        NewChat: '',
        Contacts: 'Contacts',
        Menu: 'Menu',
      };

      const iconPaths: { [key: string]: string } = {
        Tags: focused ? mdiTagText : mdiTagTextOutline,
        Chats: focused ? mdiChatProcessing : mdiChatProcessingOutline,
        Contacts: focused ? mdiAccountGroup : mdiAccountGroupOutline,
        Menu: focused ? mdiSquareRounded : mdiSquareRoundedOutline,
      };

      const iconComponentStyle = {
        color: focused ? colors.blue600 : colors.gray200,
        size: 30,
      };

      const styles = StyleSheet.create({
        mainIcon: {
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 24,
          paddingLeft: 3,
          width: 64,
          height: 64,
          borderRadius: 100,
          transform: [{ rotateZ: '-40deg' }],
          backgroundColor: colors.blue600,
        },
        standardIcon: {
          paddingTop: 8,
          alignItems: 'center',
          rowGap: 2,
        },
        label: {
          color: focused ? colors.blue600 : colors.gray200,
          fontWeight: '500',
        },
      });

      // Tricky way to hanlde TabScreen as button
      // Probably there is a better solution but it's first thing that came to my mind
      const newChatIcon = (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('StartChat')}
        >
          <View style={styles.mainIcon}>
            <Icon path={mdiSendVariantOutline} color="white" size={32} />
          </View>
        </TouchableWithoutFeedback>
      );

      const standardIcon = (
        <View style={styles.standardIcon}>
          <Icon path={iconPaths[props.route.name]} {...iconComponentStyle} />
          <Text style={styles.label}>{labels[props.route.name]}</Text>
        </View>
      );

      return props.route.name === 'NewChat' ? newChatIcon : standardIcon;
    },
  });

  return (
    <Tab.Navigator screenOptions={TabNavigatorScreenOptions}>
      <Tab.Screen name="Tags" component={TagsView} />
      <Tab.Screen name="Chats">
        {() => <ChatsView rootNavigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen name="NewChat">{() => <></>}</Tab.Screen>
      <Tab.Screen name="Contacts" component={ContactsView} />
      <Tab.Screen name="Menu" component={MenuView} />
    </Tab.Navigator>
  );
}

// This double navigation and setOptions in ConvesationsView should probably be done better
const AppNavigatorScreenOptions = (
  props: NativeStackScreenProps<RootStackParamList>
): NativeStackNavigationOptions => ({
  headerShown: props.route.name === 'App' ? false : true,
  headerStyle: {
    backgroundColor: colors.blue600,
  },
  headerTintColor: '#fff',
});

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={AppNavigatorScreenOptions}>
        <Stack.Screen name="Home" component={RegisterView} />
        <Stack.Screen name="App" component={TabNavigator} />
        <Stack.Screen name="Conversation" component={ConversationView} />
        <Stack.Screen
          name="StartChat"
          options={{
            title: 'Send new message',
            presentation: 'modal',
          }}
          component={StartChatView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
