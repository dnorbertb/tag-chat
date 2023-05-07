import MessageTypeSwitchBarButton from './MessageTypeSwitchBarButton';
import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { colors } from '../../../styles/colors';

const messageTypeBarItems: {
  value: IConversationsFilter;
  name: string;
}[] = [
  {
    value: { filter: undefined },
    name: 'All',
  },
  {
    value: { filter: { type: 'direct-message' } },
    name: 'Directs',
  },
  {
    value: { filter: { type: 'group-message' } },
    name: 'Groups',
  },
];

export interface IConversationsFilter {
  filter:
    | undefined
    | { type: 'group-message' | 'direct-message' }
    | { unread: boolean };
}

interface IProps {
  onChange: (value: IConversationsFilter) => void;
}

export default function MessageTypeSwitchBar({ onChange }: IProps) {
  const [activeButton, setActiveButton] = useState<number>();

  const pressHandler = (value: IConversationsFilter, index: number) => {
    setActiveButton(index);
    onChange(value);
  };

  useEffect(() => {
    setActiveButton(0);
    onChange(messageTypeBarItems[0].value);
  }, []);

  return (
    <View style={styles.bar}>
      {messageTypeBarItems.map((item, index) => (
        <MessageTypeSwitchBarButton
          {...item}
          key={item.name}
          active={activeButton === index}
          onPress={(value) => pressHandler(value, index)}
        />
      ))}
      <View style={styles.divider} />
      <MessageTypeSwitchBarButton
        name="Unread"
        onPress={(value) => pressHandler(value, messageTypeBarItems.length)}
        value={{ filter: { unread: true } }}
        active={activeButton === messageTypeBarItems.length}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 10,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
  },
  divider: {
    height: 8,
    width: 2,
    backgroundColor: colors.gray50,
  },
});
