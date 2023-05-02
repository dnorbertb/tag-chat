import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ScreenLayout from '../../Layouts/ScreenLayout';
import TagsBox from '../../components/TagsBox/TagsBox';
import WhiteBox from '../../components/UI/WhiteBox';
import Icon from '../../components/UI/Icon';
import { mdiPlus } from '@mdi/js';
import { colors } from '../../styles/colors';

// Dummy
import { tagsData } from '../../_dummy/dummyData';

export default function TagsView() {
  return (
    <ScreenLayout topBarHeader="Tags">
      <View style={styles.boxesContainer}>
        {tagsData.map((box) => (
          <TagsBox {...box} key={box.category} />
        ))}
      </View>
      <WhiteBox>
        <TouchableOpacity style={styles.addButton}>
          <Icon path={mdiPlus} size={24} color={colors.blue600} />
          <Text style={styles.addButtonText}>Add a Category</Text>
        </TouchableOpacity>
      </WhiteBox>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  boxesContainer: {
    rowGap: 15,
    marginBottom: 15,
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginLeft: -10,
    fontSize: 15
  },
  addButtonText: {
    color: colors.blue600,
    fontWeight: '600',
  },
});
