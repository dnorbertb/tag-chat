import { View, StyleSheet, Platform } from 'react-native';
import ChatsView from './ChatsView/ChatsView';
import ContactsView from './ContactsView/ContactsView';
import StartChatView from './StartChatView/StartChatView';
import MenuView from './MenuView/MenuView';
import TagsView from './TagsView/TagsView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

import { Text } from 'react-native';
import Icon from '../components/Icon';
import { colors } from '../styles/colors';
import { NavigationContainer } from '@react-navigation/native';

export type TabStackParamList = {
  Tags: undefined;
  Chats: undefined;
  NewChat: undefined;
  Contacts: undefined;
  Menu: undefined;
};

type Props = BottomTabScreenProps<TabStackParamList>;

const Tab = createBottomTabNavigator<TabStackParamList>();

const screenOptions: (props: Props) => BottomTabNavigationOptions = (
  props
) => ({
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

    const standarIcon = (
      <View style={styles.standardIcon}>
        <Icon path={iconPaths[props.route.name]} {...iconComponentStyle} />
        <Text style={styles.label}>{labels[props.route.name]}</Text>
      </View>
    );

    return props.route.name === 'NewChat' ? newChatIcon : standarIcon;
  },
});

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Tags" component={TagsView} />
        <Tab.Screen name="Chats" component={ChatsView} />
        <Tab.Screen name="NewChat" component={StartChatView} />
        <Tab.Screen name="Contacts" component={ContactsView} />
        <Tab.Screen name="Menu" component={MenuView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
