import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppView from '../AppView/AppView';
import WhiteBox from '../../components/WhiteBox';
import Icon from '../../components/Icon';
import TagsBox from './TagsBox/TagsBox';
import { mdiPlus } from '@mdi/js';
import { colors } from '../../styles/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { useAppSelector } from '../../store/store';

export default function TagsView() {
  const tagList = useAppSelector((state) => state.tags.value);

  return (
    <AppView topBarHeader="Tags">
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.boxesContainer}>
            {tagList.map((box) => (
              <TagsBox {...box} key={box.category} />
            ))}
          </View>
          <WhiteBox>
            <TouchableOpacity style={styles.addButton}>
              <Icon path={mdiPlus} size={24} color={colors.blue600} />
              <Text style={styles.addButtonText}>Add a Category</Text>
            </TouchableOpacity>
          </WhiteBox>
        </View>
      </ScrollView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
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
    fontSize: 15,
  },
  addButtonText: {
    color: colors.blue600,
    fontWeight: '600',
  },
});
