import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AppView from '../AppView/AppView';
import MessageTypeSwitchBar from './MessageTypeSwitchBar/MessageTypeSwitchBar';
import { dummyConversations } from '../../_dummy/dummyData';
import ChatBox from './ChatBox/ChatBox';
import { RootStackParamList } from '../AppNavigator';

export default function ChatsView({
  parentNavigation,
}: {
  parentNavigation: NativeStackScreenProps<RootStackParamList>['navigation'];
}) {
  const [activeMessageType, setMessageType] = useState<Object>();
  let items: Array<Swipeable | null> = [];
  let prevOpenedItem: Swipeable | null;

  const closeItem = (index: number) => {
    if (prevOpenedItem && prevOpenedItem !== items[index]) {
      prevOpenedItem.close();
    }
    prevOpenedItem = items[index];
  };

  const goToConversation = (id: number) => {
    parentNavigation.navigate('Conversation', {
      id: id,
    });
  };

  return (
    <AppView topBarHeader="Chats">
      <View style={styles.mainContainer}>
        <MessageTypeSwitchBar onChange={(value) => setMessageType(value)} />
        <FlatList
          data={dummyConversations}
          renderItem={({ item, index }) => (
            <ChatBox
              ref={(ref) => (items[index] = ref)}
              onSwipeableOpen={() => closeItem(index)}
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
    padding: 15
  },
});
