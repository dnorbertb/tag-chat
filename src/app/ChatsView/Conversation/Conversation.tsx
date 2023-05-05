import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChatsStackParamsList } from '../ChatsView';

export default function ConversationView({
  route,
}: NativeStackScreenProps<ChatsStackParamsList, 'Conversation'>) {
  return (
    <View>
      <Text>{route.params.id}</Text>
    </View>
  );
}
