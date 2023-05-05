import { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AppView from '../../AppView/AppView';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MessageTypeSwitchBar from '../MessageTypeSwitchBar/MessageTypeSwitchBar';
import ChatBox from '../ChatBox/ChatBox';
import { dummyConversations } from '../../../_dummy/dummyData';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChatsStackParamsList } from '../ChatsView';

export default function ChatsList({
  navigation,
}: NativeStackScreenProps<ChatsStackParamsList, 'Home'>) {
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
    console.log(id);
    navigation.navigate('Conversation', {
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
          // Here should be some id
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
  },
});
