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

interface IProps {
  id: number;
  image: string;
  contactName: string;
  lastMessage: {
    author: string;
    content: string;
  };
  onSwipeableOpen: () => void;
  goToConversation: (id: number) => void;
}

const ChatBox = forwardRef(
  (
    {
      id,
      image,
      contactName,
      lastMessage,
      onSwipeableOpen,
      goToConversation,
    }: IProps,
    ref: React.ForwardedRef<Swipeable>
  ) => {
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
                    uri: image,
                  }}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{contactName}</Text>
                  <Text style={styles.message}>
                    {lastMessage.author}: {lastMessage.content}
                  </Text>
                </View>
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
});

export default ChatBox;
