import { View, StyleSheet } from 'react-native';
import AppTopBar from './TopBar/AppTopBar';

interface IProps {
  topBarHeader: string;
  children: React.ReactNode;
}

export default function AppView({ topBarHeader, children }: IProps) {
  return (
    <View style={styles.appViewContainer}>
      <AppTopBar header={topBarHeader} />
      <View style={styles.contentView}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  appViewContainer: {
    flex: 1,
  },
  contentView: {
    padding: 15,
    flex: 1,
  },
});
