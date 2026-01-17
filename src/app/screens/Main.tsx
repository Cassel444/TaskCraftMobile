import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Pressable,
  ImageBackground,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GradientText } from '../../components/GradientText';
import { gradient } from '../../styles/gradient';
import { GradientBorder } from '../../components/GradientBorder';
import bgImage from '../../assets/bg/profile_default_theme.webp';

const menuItems = [
  {
    key: 'boards',
    screen: 'Boards',
    icon: <Icon name="file-o" size={30} color="#ff2d55" />,
  },
  {
    key: 'calendar',
    screen: 'Calendar',
    icon: <Icon name="calendar" size={30} color="#ff2d55" />,
  },
  {
    key: 'analytics',
    screen: 'Analytics',
    icon: <Icon name="pie-chart" size={30} color="#ff2d55" />,
  },
  {
    key: 'achievements',
    screen: 'Achievements',
    icon: <Icon name="trophy" size={30} color="#ff2d55" />,
  },
  {
    key: 'search',
    screen: 'Search',
    icon: <Icon name="search" size={30} color="#ff2d55" />,
  },
  {
    key: 'update',
    screen: 'Update',
    icon: <Icon name="bullhorn" size={30} color="#ff2d55" />,
  },
];

export default function MainScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const animations = useRef(menuItems.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(
      100,
      animations.map((anim) =>
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ),
    ).start();
  }, []);

  return (
    <ImageBackground
      source={bgImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <GradientText gradient={gradient} style={styles.title}>
            {t('main.page_title')}
          </GradientText>
          <GradientBorder gradient={gradient}>
            {' '}
            <View style={styles.underline} />
          </GradientBorder>
        </View>
        <View style={styles.grid}>
          {menuItems.map((item, index) => {
            const scale = animations[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0.9, 1],
            });

            const opacity = animations[index];

            return (
              <Animated.View
                key={item.key}
                style={[styles.card, { transform: [{ scale }], opacity }]}
              >
                <Pressable
                  onPress={() => navigation.navigate(item.screen as never)}
                  style={({ pressed }) => [
                    styles.pressable,
                    pressed && styles.pressed,
                  ]}
                >
                  <View> {item.icon}</View>
                  <Text style={styles.cardTitle}>
                    {t(`main.menu.${item.key}`)}
                  </Text>
                </Pressable>
              </Animated.View>
            );
          })}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 40,
  },
  titleWrapper: {
    alignSelf: 'center', // 🔥 ширина = ширині контенту
  },
  underline: {
    height: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },

  card: {
    width: '47%',
    borderRadius: 20,
    backgroundColor: '#23395b',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  pressable: {
    alignItems: 'center',
    paddingVertical: 34,
    gap: 5,
  },

  pressed: {
    transform: [{ scale: 0.95 }],
  },

  iconWrapper: {
    width: 60,
    height: 60,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
