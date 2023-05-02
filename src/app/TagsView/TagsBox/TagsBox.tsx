import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SingleTag from './SingleTag';
import WhiteBox from '../../../components/WhiteBox';
import { colors } from '../../../styles/colors';


interface IProps {
  color: string;
  category: string;
  tagList: Array<{
    tagName: string;
    actionsCount: number;
  }>;
}

export default function TagsBox({
  color,
  category,
  tagList,
}: IProps): JSX.Element {
  const boxStyles = StyleSheet.create({
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 10,
      marginBottom: 15,
    },
    categoryName: {
      fontWeight: '600',
      fontSize: 16
    },
    addBtn: {
      marginLeft: 'auto',
    },
    addBtnText: {
      color: colors.blue600,
      fontWeight: '600',
      fontSize: 16
    },
    colorIndicator: {
      width: 15,
      height: 15,
      backgroundColor: color,
      borderRadius: 99,
    },
    tagContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      gap: 8,
    },
  });

  return (
    <WhiteBox>
      {/* Top bar */}
      <View style={boxStyles.topBar}>
        <View style={boxStyles.colorIndicator}></View>
        <Text style={boxStyles.categoryName}>{category}</Text>
        <TouchableOpacity style={boxStyles.addBtn}>
          <Text style={boxStyles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>
      {/* Tags container */}
      <View style={boxStyles.tagContainer}>
        {tagList.map((item) => (
          <SingleTag {...item} color={color} key={item.tagName} />
        ))}
      </View>
    </WhiteBox>
  );
}
