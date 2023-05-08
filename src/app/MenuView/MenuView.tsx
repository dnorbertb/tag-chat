import { Text, View, ScrollView, StyleSheet } from 'react-native';
import AppView from '../AppView/AppView';
import { colors } from '../../styles/colors';
import Icon from '../../components/Icon';
import { mdiChevronRight } from '@mdi/js';
import { useAppSelector } from '../../store/store';

export default function MenuView() {
  // This is only template to not leave UI empty
  const menuItems = ['Account', 'Notifications', 'Settings'];
  const appState = useAppSelector((state) => state.app.value);

  return (
    <AppView topBarHeader="Menu">
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {menuItems.map((item, index) => {
              return (
                <View
                  key={item}
                  style={[
                    styles.menuItem,
                    index !== menuItems.length - 1 && styles.borderBottom,
                  ]}
                >
                  <Text style={styles.menuItemTitle}>{item}</Text>
                  <Icon
                    path={mdiChevronRight}
                    size={24}
                    color={colors.gray300}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
      <Text style={styles.userIdText}>User ID: {appState.userId}</Text>
    </AppView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 15,
  },
  userIdText: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray200
  },

  contentContainer: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.gray50,
    backgroundColor: 'white',
    overflow: 'hidden',
  },

  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: 'white',
    borderBottomColor: colors.gray50,
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
  menuItemTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
});
