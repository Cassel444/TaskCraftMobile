import LinearGradient from 'react-native-linear-gradient';
import { Pressable } from 'react-native';

export const GradientButton = ({
  children,
  onPress,
  gradient,
  style,
  ...rest
}) => {
  return (
    <Pressable
      onPress={onPress}
      {...rest}
      style={({ pressed }) => [pressed && { transform: [{ scale: 1.05 }] }]}
    >
      <LinearGradient {...gradient} style={style}>
        {children}
      </LinearGradient>
    </Pressable>
  );
};
