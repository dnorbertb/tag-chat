import { View } from 'react-native';
import ScreenLayout from '../../Layouts/ScreenLayout';
import MessageTypeSwitchBar from '../../components/MessageTypeSwitchBar/MessageTypeSwitchBar';
import { useState } from 'react';

export default function ChatsView() {
  const [activeMessageType, setMessageType] = useState<Object>();

  
  return (
    <ScreenLayout topBarHeader="Chats">
      <View>
        <MessageTypeSwitchBar onChange={(value) => setMessageType(value)} />
      </View>
    </ScreenLayout>
  );
}
