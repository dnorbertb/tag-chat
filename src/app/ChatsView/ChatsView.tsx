import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatsList from './ChatsList/ChatsList';
import Conversation from './Conversation/Conversation';

export type ChatsStackParamsList = {
  Home: undefined;
  Conversation: {
    id: number;
  };
};

const ChatsViewStackNavigator =
  createNativeStackNavigator<ChatsStackParamsList>();

export default function ChatsView() {
  return (
    <ChatsViewStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <ChatsViewStackNavigator.Screen name="Home" component={ChatsList} />
      <ChatsViewStackNavigator.Screen name="Conversation" component={Conversation} />
    </ChatsViewStackNavigator.Navigator>
  );
}
