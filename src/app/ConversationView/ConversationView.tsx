import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';
import { dummyConversationsContent } from '../../_dummy/dummyData';
import { colors } from '../../styles/colors';
import { FlatList, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function ConversationView({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Conversation'>) {
  const [message, setMessage] = useState('');
  const conversation =
    dummyConversationsContent[
      route.params.id as keyof typeof dummyConversationsContent
    ];
  useEffect(() => {
    navigation.setOptions({ title: conversation.contact.contactName });
  }, []);

  return (
    <View style={styles.mainView}>
      <View style={styles.messagesContainer}>
        <FlatList
          data={conversation.messages}
          renderItem={({ item }) => {
            if (item.type === 'received') {
              return (
                <ReceivedMessage
                  image={conversation.contact.image}
                  content={item.content}
                />
              );
            } else {
              return <SentMessage content={item.content} />;
            }
          }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />

        <View style={styles.newMessageContainer}>
          <TextInput
            style={styles.messageInput}
            onChangeText={setMessage}
            placeholder="Write a message..."
          />
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendBtnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  separator: {
    height: 10,
    backgroundColor: 'transparent',
  },
  newMessageContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    gap: 10,
  },
  messageInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    fontSize: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.gray100,
    borderRadius: 15,
  },
  sendButton: {
    justifyContent: 'center',
    backgroundColor: colors.blue600,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  sendBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },

  // Components below
  // Received component
  receivedMessage: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  receivedMessageImage: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  receivedMessageTextContainer: {
    backgroundColor: colors.blue600,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  receivedMessageText: {
    color: 'white',
    fontSize: 16,
  },
  // Sent message component
  sentMessage: {
    alignSelf: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: colors.gray100,
    borderRadius: 15,
  },
  sentMessageText: {
    fontSize: 16,
    justifyContent: 'flex-end',
  },
});

function ReceivedMessage({
  image,
  content,
}: {
  image: string;
  content: string;
}) {
  return (
    <View style={styles.receivedMessage}>
      <Image
        style={styles.receivedMessageImage}
        source={{
          uri: image,
        }}
      />
      <View style={styles.receivedMessageTextContainer}>
        <Text style={styles.receivedMessageText}>{content}</Text>
      </View>
    </View>
  );
}

function SentMessage({ content }: { content: string }) {
  return (
    <View style={styles.sentMessage}>
      <Text style={styles.sentMessageText}>{content}</Text>
    </View>
  );
}
