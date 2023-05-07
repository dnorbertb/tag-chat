import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  KeyboardEventListener,
  Animated,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';
import { colors } from '../../styles/colors';
import { FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useAppSelector } from '../../store/store';

export default function ConversationView({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Conversation'>) {
  const [message, setMessage] = useState('');

  // This component should have fixed types but I don't have time for it,
  const conversation = useAppSelector((state) =>
    state.conversations.value.find((c) => c.id === route.params.id)
  );

  useEffect(() => {
    navigation.setOptions({
      title: `${conversation?.contact.firstName} ${conversation?.contact.lastName}`,
    });
  }, []);

  // As I understood KeyboardAvoidingView needs ScrollView inside
  // FlatView can't be nested inside ScrollView so this is the solution
  // Seems to work on iOS and Android Emulator
  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', _keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', _keyboardWillHide);

    return () => {
      Keyboard.removeAllListeners('keyboardWillShow');
      Keyboard.removeAllListeners('keyboardWillHide');
    };
  }, []);

  const transformAnim = useRef(new Animated.Value(0)).current;

  const _keyboardWillShow: KeyboardEventListener = (e) => {
    const keyboardHeight = e.endCoordinates.height;
    Animated.timing(transformAnim, {
      toValue: -keyboardHeight,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  const _keyboardWillHide = () => {
    Animated.timing(transformAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.mainContainer,
        {
          transform: [{ translateY: transformAnim }],
        },
      ]}
    >
      <View style={styles.remainingHeightContainer}>
        <View>
          <FlatList
            data={conversation?.messages}
            renderItem={({ item }) => {
              if (item.type === 'received') {
                return (
                  <ReceivedMessage
                    image={conversation!.contact.image}
                    content={item.content}
                  />
                );
              } else {
                return <SentMessage content={item.content} />;
              }
            }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.flatListContainerStyle}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      <View style={styles.newMessageContainer}>
        <TextInput
          placeholder="Write a message..."
          style={styles.messageInput}
          multiline={true}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  remainingHeightContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  flatListContainerStyle: {
    paddingBottom: 30,
  },
  separator: {
    height: 10,
    backgroundColor: 'transparent',
  },

  // New message component
  newMessageContainer: {
    marginTop: 'auto',
    maxHeight: 120,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    borderColor: colors.gray50,
    borderTopWidth: 1,
  },
  messageInput: {
    flex: 1,
    paddingHorizontal: 16,
    minHeight: 50,
    fontSize: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.gray50,
    borderRadius: 15,
  },
  sendButton: {
    justifyContent: 'center',
    backgroundColor: colors.blue600,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  sendBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },

  // Message components below
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
    borderColor: colors.gray50,
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
    backgroundColor: colors.gray50,
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
