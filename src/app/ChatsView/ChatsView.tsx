import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AppView from '../AppView/AppView';
import MessageTypeSwitchBar, {
  IConversationsFilter,
} from './MessageTypeSwitchBar/MessageTypeSwitchBar';
import ChatBox from './ChatBox/ChatBox';
import { RootStackParamList, TabStackParamList } from '../AppNavigator';
import { useAppSelector } from '../../store/store';
import { IConversation } from '../../features/conversations';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export default function ChatsView({
  tabNavigationScreenProps,
  rootNavigation,
}: {
  tabNavigationScreenProps: BottomTabScreenProps<TabStackParamList, 'Chats'>;
  rootNavigation: NativeStackScreenProps<RootStackParamList>['navigation'];
}) {
  // props
  const { navigation, route } = tabNavigationScreenProps;
  // Sorting - component data
  const [activeMessageType, setMessageType] = useState<IConversationsFilter>();
  const [conversations, setConversations] = useState<Array<IConversation>>();
  const conversationsStoreData = useAppSelector(
    (state) => state.conversations.value
  );

  useEffect(() => {
    const sort = (arr: IConversation[]) =>
      arr
        .sort(
          (a, b) =>
            new Date(a.lastUpdate).getTime() - new Date(b.lastUpdate).getTime()
        )
        .reverse();

    if (!activeMessageType?.filter) {
      const cDataCopy = [...conversationsStoreData];
      sort(cDataCopy);
      setConversations(cDataCopy);
      return;
    }

    const [filterName, filterValue] = Object.entries(
      activeMessageType.filter
    )[0];
    const withFilter = conversationsStoreData.filter(
      (c) => c[filterName as keyof IConversation] === filterValue
    );

    sort(withFilter);
    setConversations(withFilter);
    return;
  }, [activeMessageType, conversationsStoreData]);

  /**
   * Redirect effect
   * If user sends new message is redirected to conversations
   * Then to right conversation
   * If user is goin back is redirected to conversations tab
   * Not to new message tab
   */
  useEffect(() => {
    const redirectToId = route.params?.chatId;
    if (!redirectToId) return;
    goToConversation(redirectToId);
  }, []);

  // Swipeable state/closing functionality
  let items: Array<Swipeable | null> = [];
  let prevOpenedItem: Swipeable | null;

  const closeLastSwipableItem = (index: number) => {
    if (prevOpenedItem && prevOpenedItem !== items[index]) {
      prevOpenedItem.close();
    }
    prevOpenedItem = items[index];
  };

  // Helpers
  const goToConversation = (id: string) => {
    rootNavigation.navigate('Conversation', {
      id: id,
    });
  };

  return (
    <AppView topBarHeader="Chats">
      <View style={styles.mainContainer}>
        <MessageTypeSwitchBar onChange={(value) => setMessageType(value)} />
        <FlatList
          data={conversations}
          renderItem={({ item, index }) => (
            <ChatBox
              ref={(ref) => (items[index] = ref)}
              onSwipeableOpen={() => closeLastSwipableItem(index)}
              goToConversation={goToConversation}
              {...item}
            />
          )}
          keyExtractor={(item) => `chat-${item.id}`}
        />
      </View>
    </AppView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    gap: 16,
    flex: 1,
    padding: 15,
  },
});
