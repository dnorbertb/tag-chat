import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AppView from '../AppView/AppView';
import MessageTypeSwitchBar, {
  IConversationsFilter,
} from './MessageTypeSwitchBar/MessageTypeSwitchBar';
import ChatBox from './ChatBox/ChatBox';
import { RootStackParamList } from '../AppNavigator';
import { useAppSelector } from '../../store/store';
import { IConversation } from '../../features/conversations';

export default function ChatsView({
  rootNavigation,
}: {
  rootNavigation: NativeStackScreenProps<RootStackParamList>['navigation'];
}) {
  const [activeMessageType, setMessageType] = useState<IConversationsFilter>();
  const [conversations, setConversations] = useState<Array<IConversation>>();
  const conversationsStoreData = useAppSelector(
    (state) => state.conversations.value
  );
  let items: Array<Swipeable | null> = [];
  let prevOpenedItem: Swipeable | null;

  const closeLastSwipableItem = (index: number) => {
    if (prevOpenedItem && prevOpenedItem !== items[index]) {
      prevOpenedItem.close();
    }
    prevOpenedItem = items[index];
  };

  const goToConversation = (id: string) => {
    rootNavigation.navigate('Conversation', {
      id: id,
    });
  };

  useEffect(() => {
    const sort = (arr: IConversation[]) =>
      arr.sort(
        (a, b) =>
          new Date(a.lastUpdate).getTime() - new Date(b.lastUpdate).getTime()
      );

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
