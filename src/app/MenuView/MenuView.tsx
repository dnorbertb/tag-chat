import { Text, View, ScrollView, StyleSheet } from 'react-native';
import AppView from '../AppView/AppView';
import { colors } from '../../styles/colors';
import Icon from '../../components/Icon';
import { mdiChevronRight } from '@mdi/js';

export default function MenuView() {
  // This is only template to not leave UI empty
  const menuItems = ['Account', 'Notifications', 'Settings'];
  return (
    <AppView topBarHeader="Menu">
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {menuItems.map((item, index) => {
              return (
                <View
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
    </AppView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 15,
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
