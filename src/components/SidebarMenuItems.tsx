import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type SidebarMenuItemProps = {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode;
};

export const SidebarMenuItem = ({
  label,
  onPress,
  icon,
}: SidebarMenuItemProps) => {
  const [active, setActive] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setActive(true)}
      onPressOut={() => setActive(false)}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      {icon ? (
        <View style={styles.iconWrapper}>
          (
          <Text style={[styles.icon, active && styles.activeIcon]}>{icon}</Text>
          )
        </View>
      ) : (
        <Icon
          name={active ? 'lightbulb-on' : 'lightbulb-outline'}
          size={20}
          color={active ? '#FFD84D' : '#9CA3AF'}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    width: 28,
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    opacity: 0.7,
  },
  activeIcon: {
    opacity: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#ffffff08',
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  pressed: {
    backgroundColor: '#ffffff12',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  activeText: {
    color: '#7dd3fc',
    fontWeight: '600',
  },
});
