import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';

export default function MessageTypeSwitchBarButton<T>({
  name,
  onPress,
  active,
  value,
}: {
  name: string;
  value: T;
  onPress: (arg: T) => void;
  active?: boolean;
}): JSX.Element {
  const style = StyleSheet.create({
    button: {
      flex: 1,
      alignItems: 'center',
      borderRadius: 10,
      paddingVertical: 6,
      backgroundColor: active ? colors.gray50 : 'white',
    },
    buttonText: {
      color: active ? 'black' : colors.gray200,
      fontSize: 16
    },
  });

  return (
    <TouchableOpacity style={style.button} onPress={() => onPress(value)}>
      <Text style={style.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
}
