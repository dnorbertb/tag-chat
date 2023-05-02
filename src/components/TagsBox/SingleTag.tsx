import { View, Text, StyleSheet } from 'react-native';

interface IProps {
  tagName: string;
  actionsCount: number;
  color: string;
}

export default function SingleTag({
  tagName,
  actionsCount,
  color,
}: IProps): JSX.Element {
  const tagStyles = StyleSheet.create({
    tagContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 8,
      paddingVertical: 5,
      borderRadius: 8,
      backgroundColor: color,
    },
    tagName: {
      color: 'white',
      fontSize: 16,
    },
    actionsCount: {
      color: 'white',
      fontWeight: '100',
      fontSize: 16,
    },
  });

  return (
    <View style={tagStyles.tagContainer}>
      <Text style={tagStyles.tagName}>{tagName}</Text>
      <Text style={tagStyles.actionsCount}>{actionsCount}</Text>
    </View>
  );
}
