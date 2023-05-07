import { Text, View, Image, StyleSheet } from 'react-native';
import AppView from '../AppView/AppView';
import { dummyContacts } from '../../_dummy/dummyData';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../styles/colors';

export default function ContactsView() {
  const contactsAlphabetical = dummyContacts.sort((a, b) => {
    if (a.firstName < b.firstName) return -1;
    if (a.firstName > b.firstName) return 1;
    return 0;
  });

  const firstLettersList = contactsAlphabetical.map((contact) =>
    contact.firstName.charAt(0).toUpperCase()
  );
  const firstLettersListWithoutDuplicates = [...new Set(firstLettersList)];

  // Images are loaded from network but they should be stored on device to avoid loading

  return (
    <AppView topBarHeader="Contacts">
      <ScrollView>
        {firstLettersListWithoutDuplicates.map((letter) => (
          <View key={`letterIndicatorComponent=${letter}`}>
            <View style={styles.letterIndicator}>
              <Text style={styles.letterIndicatorText}>{letter}</Text>
            </View>
            {contactsAlphabetical
              .filter(
                (contact) =>
                  contact.firstName.charAt(0).toUpperCase() === letter
              )
              .map((contact) => {
                return (
                  <View key={contact.id} style={styles.contactComponent}>
                    <Image
                      style={styles.contactImage}
                      source={{
                        uri: contact.image,
                      }}
                    />
                    <View style={styles.contactTextsContainer}>
                      <Text style={styles.contactNameText}>
                        {contact.firstName} {contact.lastName}
                      </Text>
                      <Text style={styles.contactNumberText}>
                        {contact.phone}
                      </Text>
                    </View>
                  </View>
                );
              })}
          </View>
        ))}
        <View style={styles.listSpacer} />
      </ScrollView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  listSpacer: {
    height: 30
  },

  // Letter indicator component
  letterIndicator: {
    paddingHorizontal: 15,
    paddingVertical: 1,
    backgroundColor: colors.gray50,
    borderColor: colors.gray100,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  letterIndicatorText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.gray300,
  },

  // Single contact component
  contactComponent: {
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderColor: colors.gray50,
    borderBottomWidth: 1,
  },
  contactImage: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    borderColor: colors.gray50,
    borderWidth: 1,
  },
  contactTextsContainer: {
    justifyContent: 'space-between'
  },
  contactNameText: {
    fontSize: 16,
    fontWeight: '500',
  },
  contactNumberText: {
    fontSize: 14,
    color: colors.gray200
  },
});
