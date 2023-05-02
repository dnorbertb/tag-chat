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
import Icon from '../components/UI/Icon';
import { colors } from '../styles/colors';

const Tab = createBottomTabNavigator();
type RootStackParamList = {
  [key: string]: undefined;
};

type Routes = 'tags' | 'chats' | 'newChat' | 'contacts' | 'menu';

type Props = BottomTabScreenProps<RootStackParamList, Routes>;

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
      tags: 'Tags',
      chats: 'Chats',
      newChat: '',
      contacts: 'Contacts',
      menu: 'Menu',
    };

    const iconPaths: { [key: string]: string } = {
      tags: focused ? mdiTagText : mdiTagTextOutline,
      chats: focused ? mdiChatProcessing : mdiChatProcessingOutline,
      contacts: focused ? mdiAccountGroup : mdiAccountGroupOutline,
      menu: focused ? mdiSquareRounded : mdiSquareRoundedOutline,
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

    return props.route.name === 'newChat' ? newChatIcon : standarIcon;
  },
});

export default function ChatNavigator() {
  return (
    <Tab.Navigator screenOptions={screenOptions as BottomTabNavigationOptions}>
      <Tab.Screen name="tags" component={TagsView} />
      <Tab.Screen name="chats" component={ChatsView} />
      <Tab.Screen name="newChat" component={StartChatView} />
      <Tab.Screen name="contacts" component={ContactsView} />
      <Tab.Screen name="menu" component={MenuView} />
    </Tab.Navigator>
  );
}
