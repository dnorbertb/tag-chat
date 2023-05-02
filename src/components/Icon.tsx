import { Svg, Path } from "react-native-svg";
import { StyleSheet } from "react-native";

type Props = {
  path: string;
  color: string;
  size: number;
};

export default function Icon({ color, path, size }: Props): JSX.Element {
  const styles = StyleSheet.create({
    icon: {
      height: size,
      width: size,
    },
  });

  return (
    <Svg style={styles.icon} viewBox="0 0 24 24">
      <Path fill={color} d={path} />
    </Svg>
  );
}
