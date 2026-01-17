import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { gradient } from '../../styles/gradient';
import { useGetCurrentUser } from '../../hooks/users/currentUser/useGetCurrentUser';
import { GradientButton } from '../../components/GradientButton';
import { SidebarMenuItem } from '../../components/SidebarMenuItems';
import { GradientBorder } from '../../components/GradientBorder';
import { GradientText } from '../../components/GradientText';
import Icon from 'react-native-vector-icons/Feather';

export default function Sidebar({ isOpen, onToggleSidebar }) {
  const { t } = useTranslation();
  const slideAnim = useRef(new Animated.Value(-260)).current;
  const navigation = useNavigation();
  const { data: user } = useGetCurrentUser();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -260,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const menuItems = [
    { key: 'boards', screen: 'Boards' },
    { key: 'analytics', screen: 'Analytics' },
    { key: 'achievements', screen: 'Achievements' },
    { key: 'calendar', screen: 'Calendar' },
    { key: 'support', screen: 'Support' },
  ];

  return (
    <Animated.View style={[styles.sidebar, { left: slideAnim }]}>
      <View style={styles.header}>
        {/* Закриття сайдбара */}
        <GradientButton
          style={styles.closeBtn}
          gradient={gradient}
          onPress={onToggleSidebar}
        >
          <Icon name="arrow-left" size={30} color="white" />
        </GradientButton>

        <GradientBorder gradient={gradient}>
          <Image
            source={require('../../assets/logo/default-avatar.webp')}
            style={styles.avatar}
          />
        </GradientBorder>
        <GradientText gradient={gradient} style={styles.username}>
          {user?.username || user?.email || 'User'}
        </GradientText>
      </View>

      {/* Навігація */}
      <View style={styles.menu}>
        {menuItems.map((item) => (
          <SidebarMenuItem
            key={item.key}
            label={t(`sidebar.${item.key}`)}
            onPress={() => {
              navigation.navigate(item.screen as never);
              onToggleSidebar();
            }}
          />
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#1f2a45',
    paddingTop: 40,
    paddingHorizontal: 20,
    zIndex: 100,
    borderRightWidth: 0.5,
    borderRightColor: 'gray',
  },
  closeBtn: {
    position: 'absolute',
    top: -10,
    right: -105,
    padding: 5,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#ffffff08',
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 40,
  },
  username: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  menu: {
    gap: 20,
  },
});
