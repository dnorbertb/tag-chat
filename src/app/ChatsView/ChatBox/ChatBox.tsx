import { View, Image, Text, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import WhiteBox from '../../../components/WhiteBox';
import { colors } from '../../../styles/colors';
import ChatBoxButtons from './ChatBoxButtons';
import { forwardRef } from 'react';
import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { IConversation } from '../../../features/conversations';

interface IProps extends IConversation {
  onSwipeableOpen: () => void;
  goToConversation: (id: string) => void;
}

const ChatBox = forwardRef(
  (
    {
      id,
      type,
      unread,
      contact,
      messages,
      onSwipeableOpen,
      goToConversation,
    }: IProps,
    ref: React.ForwardedRef<Swipeable>
  ) => {
    const lastMsg = messages.slice(-1)[0];
    const lastMsgAuthor =
      lastMsg.type === 'received' ? `${contact.firstName}` : 'You';
    const lastMsgContentParsed =
      lastMsg.content.length > 15
        ? lastMsg.content.slice(0, 15) + '...'
        : lastMsg.content;

    return (
      <GestureHandlerRootView>
        <Swipeable
          onSwipeableOpen={onSwipeableOpen}
          ref={ref}
          renderLeftActions={() => <ChatBoxButtons />}
        >
          <TouchableWithoutFeedback onPress={() => goToConversation(id)}>
            <WhiteBox style={styles.whiteBox}>
              <View style={styles.chatView}>
                <Image
                  style={styles.image}
                  source={{
                    uri: contact.image,
                  }}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>
                    {contact.firstName} {contact.lastName}
                  </Text>
                  <Text style={styles.message}>
                    {lastMsgAuthor}: {lastMsgContentParsed}
                  </Text>
                </View>
                {unread && <View style={styles.unreadIndicator} />}
              </View>
            </WhiteBox>
          </TouchableWithoutFeedback>
        </Swipeable>
      </GestureHandlerRootView>
    );
  }
);

const styles = StyleSheet.create({
  whiteBox: {
    marginBottom: 16,
  },
  chatView: {
    flexDirection: 'row',
    gap: 12,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 14,
    borderColor: colors.gray50,
    borderWidth: 1,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  message: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.gray200,
  },
  unreadIndicator: {
    height: 10,
    width: 10,
    backgroundColor: colors.blue600,
    borderRadius: 20,
  },
});

export default ChatBox;
