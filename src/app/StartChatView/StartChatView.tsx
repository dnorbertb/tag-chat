import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { colors } from '../../styles/colors';

export default function StartChatView() {
  return (
    <View style={styles.mainContainer}>
      <TextInput style={styles.textInput} placeholder="Receiver ID" />
      <TextInput
        style={[styles.textInput, styles.messageInput]}
        multiline={true}
        placeholder="Message..."
      />
      <TouchableOpacity style={styles.sendButton}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>

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
    color: colors.gray200
  }
});
