import Icon from '../../../components/Icon';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';

type Props = {
  path: string;
  onPress?: (args: unknown) => unknown;
};

export default function AppTopBarButton({ path, onPress }: Props): JSX.Element {
  const styles = StyleSheet.create({
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 45,
      width: 45,
      borderRadius: 18,
      backgroundColor: colors.blue200,
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Icon path={path} color="white" size={30} />
      </View>
    </TouchableOpacity>
  );
}
