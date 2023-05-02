import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default function MessageTypeSwitchBarButton({
  name,
  onPress,
  active,
  value,
}: {
  name: string;
  value: Object;
  onPress: (arg: Object) => void;
  active?: boolean;
}): JSX.Element {
  const style = StyleSheet.create({
    button: {
      flex: 1,
      alignItems: 'center',
      borderRadius: 10,
      paddingVertical: 6,
      backgroundColor: active ? colors.gray100 : 'white',
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
