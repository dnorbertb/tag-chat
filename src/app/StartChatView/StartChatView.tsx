import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { colors } from '../../styles/colors';
import { useState } from 'react';
import { sendMessageService } from '../../services/messageService';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addMessageToConversation } from '../../features/conversations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';

export default function StartChatView({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const dispatch = useAppDispatch();
  const senderId = useAppSelector((state) => state.app.value.userId);
  const [receiverId, setReceiverId] = useState('');
  const [content, setContent] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const sendButtonHandler = async () => {
    setErrMsg('');
    if (receiverId.length < 4 && content.length < 1) {
      setErrMsg('No receiver or content');
      return;
    }
    const req = await sendMessageService({
      receiverId,
      senderId,
      content,
    });

    if (req.success) {
      dispatch(
        addMessageToConversation({
          receiverId,
          senderId,
          content,
          sentByUser: true,
        })
      );
      navigation.navigate('Conversation', { id: receiverId });
    } else {
      setErrMsg('Some error message, try again later');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <TextInput
        onChangeText={setReceiverId}
        value={receiverId}
        style={styles.textInput}
        placeholder="Receiver ID"
      />
      <TextInput
        onChangeText={setContent}
        value={content}
        style={[styles.textInput, styles.messageInput]}
        multiline={true}
        placeholder="Message..."
      />
      <TouchableOpacity onPress={sendButtonHandler} style={styles.sendButton}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
      {errMsg.length > 1 && <Text>{errMsg}</Text>}
      <Text style={styles.hintText}>
        This screen is not completely consistent with other UI but the goal is
        to add support to send some message and recive push notification. Put
        receiverId and message and click send to send the message. Please don't
        test the API or something because it was made for fun and there is no
        security or complex error handling. Your user ID should be visible in
        Menu Tab in right bottom corner.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 15,
  },
  textInput: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
  },
  messageInput: {
    maxHeight: 100,
  },
  sendButton: {
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.blue600,
    marginBottom: 10,
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  hintText: {
    color: colors.gray200,
  },
});
