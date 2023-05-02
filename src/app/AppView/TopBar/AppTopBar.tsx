import TopBarButton from './AppTopBarButton';
import { View, Text, StyleSheet } from 'react-native';
import { mdilPlus, mdilStar } from '@mdi/light-js';
import { colors } from '../../../styles/colors';

type Props = {
  header: string;
};

export default function AppTopBar({ header }: Props): JSX.Element {
  const pressHandler = () => console.log('Top bar button press');

  return (
    <View style={styles.topBar}>
      <Text style={styles.header}>{header}</Text>
      <View style={styles.buttonsContainer}>
        <TopBarButton onPress={pressHandler} path={mdilStar} />
        <TopBarButton onPress={pressHandler} path={mdilPlus} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.blue600,
    color: 'white',
  },
  header: {
    fontSize: 30,
    color: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
