import { View, StyleSheet } from 'react-native';
import AppTopBar from './TopBar/AppTopBar';

interface IProps {
  topBarHeader: string;
  children: React.ReactNode;
}

export default function ScreenLayout({ topBarHeader, children }: IProps) {
  return (
    <View>
      <AppTopBar header={topBarHeader} />
      <View style={styles.contentView}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentView: {
    padding: 15
  },
});
