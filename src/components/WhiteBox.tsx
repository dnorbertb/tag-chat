import { View, StyleSheet, type ViewStyle } from 'react-native';

interface IProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function WhiteBox({ children, style }: IProps): JSX.Element {
  return <View style={[styles.box, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  box: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
  },
});
