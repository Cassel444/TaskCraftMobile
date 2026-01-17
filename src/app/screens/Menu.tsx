import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { gradient } from '../../styles/gradient';
import { useGetCurrentUser } from '../../hooks/users/currentUser/useGetCurrentUser';
import { GradientButton } from '../../components/GradientButton';
import { SidebarMenuItem } from '../../components/SidebarMenuItems';
import { GradientBorder } from '../../components/GradientBorder';
import { GradientText } from '../../components/GradientText';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/paramList/types';
import Icon from 'react-native-vector-icons/FontAwesome6';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Menu({ isOpen, onToggleMenu }) {
  const { t } = useTranslation();
  const slideAnim = useRef(new Animated.Value(-260)).current;
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { data: user } = useGetCurrentUser();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -260,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const menuItems = [
    { key: 'home', screen: 'Home', icon: '🏠' },
    { key: 'menu', screen: 'Menu', icon: '⚡' },
    { key: 'boards', screen: 'Boards', icon: '📋' },
    { key: 'profile', screen: 'Profile', icon: '👤' },
    { key: 'logout', screen: 'Logout', icon: '🚪' },
  ];

  return (
    <Animated.View style={[styles.sidebar, { right: slideAnim }]}>
      {/* <View style={styles.header}> */}
      {/* Закриття сайдбара */}
      <GradientButton
        style={styles.closeBtn}
        gradient={gradient}
        onPress={onToggleMenu}
      >
        <Icon name="xmark" size={30} color="white" />
      </GradientButton>

      {/* <GradientBorder gradient={gradient}>
          <Image
            source={require('../../assets/logo/default-avatar.webp')}
            style={styles.avatar}
          />
        </GradientBorder>
        <GradientText gradient={gradient} style={styles.username}>
          {user?.username || user?.email || 'User'}
        </GradientText> */}
      {/* </View> */}

      {/* Навігація */}
      <View style={styles.menu}>
        {menuItems.map((item) => (
          <SidebarMenuItem
            icon={item.icon}
            key={item.key}
            label={t(`menu.${item.key}`)}
            onPress={() => {
              navigation.navigate(item.screen as never);
              onToggleMenu();
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
    width: 220,
    backgroundColor: '#1f2a45',
    paddingTop: 80,
    paddingHorizontal: 20,
    zIndex: 100,
    borderRightWidth: 0.5,
    borderRightColor: 'gray',
  },
  closeBtn: {
    position: 'absolute',
    top: -40,
    right: 150,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },

  // rotated: {
  //   transform: [{ rotate: '180deg' }],
  // },
  // header: {
  //   backgroundColor: '#ffffff08',
  //   borderColor: 'grey',
  //   borderWidth: 0.5,
  //   borderRadius: 30,
  //   padding: 10,
  //   alignItems: 'center',
  //   marginBottom: 30,
  // },
  // avatar: {
  //   width: 72,
  //   height: 72,
  //   borderRadius: 40,
  // },
  // username: {
  //   fontSize: 18,
  //   color: 'white',
  //   fontWeight: '600',
  // },
  menu: {
    marginTop: 50,
    gap: 20,
  },
});
