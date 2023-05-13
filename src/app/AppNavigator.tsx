// Base
import { View, Text, StyleSheet, Platform } from 'react-native';
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

// Logic
import { serverEventListener } from '../composables/serverEventListener';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/store';
import { addNotificationResponseReceivedListener } from 'expo-notifications';

/**
 * Navigators definitions
 */

// Root Navigator
export type RootStackParamList = {
  Home: undefined;
  Conversation: { id: string };
  StartChat: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Tabs Navigator
export type TabStackParamList = {
  Tags: undefined;
  Chats: {
    chatId?: string;
  };
  NewChat: undefined;
  Contacts: undefined;
  Menu: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

/**
 * Navigators content
 */

// Tab navigator screen options
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

    const newChatIcon = (
      <View style={styles.mainIcon}>
        <Icon path={mdiSendVariantOutline} color="white" size={32} />
      </View>
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

// Tab navigation component
function TabNavigator({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  // Listening for message notification tap to open right conversation
  useEffect(() => {
    const subscription = addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data;
      navigation.navigate('Conversation', { id: data.senderId });
    });
    return () => subscription.remove();
  }, []);

  return (
    <Tab.Navigator screenOptions={TabNavigatorScreenOptions}>
      <Tab.Screen name="Tags" component={TagsView} />
      <Tab.Screen name="Chats">
        {(props: BottomTabScreenProps<TabStackParamList, 'Chats'>) => (
          <ChatsView
            tabNavigationScreenProps={props}
            rootNavigation={navigation}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="NewChat"
        options={{
          title: 'Send new message',
        }}
        component={StartChatView}
      />
      <Tab.Screen name="Contacts" component={ContactsView} />
      <Tab.Screen name="Menu" component={MenuView} />
    </Tab.Navigator>
  );
}

// RootStackNavigation screen options
const StackNavigatorScreenOptions = (
  props: NativeStackScreenProps<RootStackParamList>
): NativeStackNavigationOptions => ({
  headerShown: props.route.name === 'Home' ? false : true,
  headerStyle: {
    backgroundColor: colors.blue600,
  },
  headerTintColor: '#fff',
});

// RootStackNavigator components
function StackNavigator() {
  const { isListening } = serverEventListener();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={StackNavigatorScreenOptions}>
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Conversation" component={ConversationView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// App Navigator - registration handler
export default function AppNavigator() {
  const [userRegistered, setUserRegistered] = useState(false);
  const userId = useAppSelector((state) => state.app.value.userId);

  useEffect(() => {
    const state = userId.length > 4;
    setUserRegistered(state);
  }, [userId]);

  if (userRegistered) {
    return <StackNavigator />;
  } else {
    return <RegisterView />;
  }
}
