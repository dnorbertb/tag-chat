import { mdiBellOff, mdiDelete } from '@mdi/js';
import Icon from '../../../components/Icon';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ChatBoxButtons() {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity>
        <View style={[styles.iconContainer, styles.removeIcon]}>
          <Icon path={mdiDelete} color="white" size={20} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={[styles.iconContainer, styles.silentIcon]}>
          <Icon path={mdiBellOff} color="white" size={20} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingRight: 16,
    marginBottom: 16,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  removeIcon: {
    backgroundColor: 'red',
  },
  silentIcon: {
    backgroundColor: '#7d3dfa',
  },
});
