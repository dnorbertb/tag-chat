import { View } from 'react-native';
import AppView from '../AppView/AppView';
import MessageTypeSwitchBar from './MessageTypeSwitchBar/MessageTypeSwitchBar';
import { useState } from 'react';

export default function ChatsView() {
  const [activeMessageType, setMessageType] = useState<Object>();

  
  return (
    <AppView topBarHeader="Chats">
      <View>
        <MessageTypeSwitchBar onChange={(value) => setMessageType(value)} />
      </View>
    </AppView>
  );
}
