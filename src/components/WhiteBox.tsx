import { View, StyleSheet } from 'react-native';

interface IProps {
  children: React.ReactNode;
}

export default function WhiteBox({ children }: IProps): JSX.Element {
  return <View style={styles.box}>{children}</View>;
}

const styles = StyleSheet.create({
  box: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15
  },
});
