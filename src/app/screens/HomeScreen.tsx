import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useGetCurrentUser } from '../../hooks/users/currentUser/useGetCurrentUser';
// import CreateBoardModal from '../components/board/CreateBoardModal/CreateBoardModal';
// import CreateBoardBtn from '../components/board/CreateBoardBtn/CreateBoardBtn';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/paramList/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GradientText } from '../../components/GradientText';
import { gradient } from '../../styles/gradient';
import { GradientButton } from '../../components/GradientButton';
import { ImageBackground } from 'react-native';
import bgImage from '../../assets/bg/profile_default_theme.webp';
import manLamp from '../../assets/images/manlamp.png';
import Sidebar from './Sidebar';
import Menu from './Menu';
import Icon from 'react-native-vector-icons/Feather';
import CreateBoardModal from './CreateBoardModal';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Home() {
  const { t } = useTranslation();
  const { data: user } = useGetCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const newState = !prev;
      if (newState && isMenuOpen) {
        setIsMenuOpen(false);
      }
      return newState;
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const newState = !prev;
      if (newState && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
      return newState;
    });
  };
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const getGreetingText = () => {
    if (user?.username) {
      return (
        <Text style={styles.greetingFullText}>
          <Text style={styles.greetingName}>{user.username}</Text>{' '}
          {t('home.greeting_username_suffix')}
        </Text>
      );
    }
    if (user?.email) {
      return (
        <Text style={styles.greetingFullText}>
          <Text style={styles.greetingName}>{user.email}</Text>{' '}
          {t('home.greeting_email_suffix')}
        </Text>
      );
    }
    return (
      <Text style={styles.greetingFullText}>{t('home.greeting_default')}</Text>
    );
  };

  return (
    <ImageBackground
      source={bgImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Sidebar Toggle Button */}
        {!isSidebarOpen && (
          <Pressable
            style={({ pressed }) => [
              styles.sidebarToggle,
              pressed && styles.buttonPressed,
            ]}
            onPress={toggleSidebar}
          >
            <Icon name="arrow-right" size={30} color="white" />
          </Pressable>
        )}
        {/* Menu Toggle Button */}
        {!isMenuOpen && (
          <Pressable
            style={({ pressed }) => [
              styles.menu,
              pressed && styles.buttonPressed,
            ]}
            onPress={toggleMenu}
          >
            <Icon name="menu" size={30} color="white" />
          </Pressable>
        )}

        <ScrollView contentContainerStyle={styles.contentWrapper}>
          <View style={styles.textContent}>
            <GradientText gradient={gradient} style={styles.title}>
              TaskCraft
            </GradientText>

            <Text style={styles.subtitle}>{t('home.subtitle')}</Text>

            {/* Welcome Card */}
            <View style={styles.welcomeCard}>
              <Text style={styles.greetingText}>
                {t('home.greeting_prefix')}
              </Text>

              {getGreetingText()}
            </View>

            {/* CTA Buttons */}
            <View style={styles.ctaSection}>
              <GradientButton
                style={styles.ctaButton}
                gradient={gradient}
                onPress={() => navigation.navigate('Calendar' as never)}
              >
                <Text style={styles.ctaText}>📅 {t('home.calendar_btn')}</Text>
              </GradientButton>
              <GradientButton
                style={styles.ctaButton}
                gradient={gradient}
                onPress={() => setIsModalOpen(true)}
              >
                <Text style={styles.ctaText}>{t('home.create_board_btn')}</Text>
              </GradientButton>
            </View>
          </View>

          <View style={styles.visualSection}>
            <Image
              source={manLamp}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>

          {/* Sidebar */}
        </ScrollView>
        <Sidebar isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
        <Menu isOpen={isMenuOpen} onToggleMenu={toggleMenu} />

        {/* Modal */}
        <Modal visible={isModalOpen} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <CreateBoardModal setIsOpen={setIsModalOpen} isOpen />
          </View>
        </Modal>
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  sidebarToggle: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 100,
    padding: 5,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    transform: [{ scale: 1.05 }],
  },
  menu: {
    position: 'absolute',
    top: 40,
    right: 10,
    zIndex: 100,
    padding: 5,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    flexGrow: 1,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },

  textContent: {
    flex: 1,
    gap: 20,
  },

  title: {
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },

  welcomeCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'grey',
    marginBottom: 20,
    backgroundColor: '#23395be6',
    alignItems: 'center',
  },
  greetingFullText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  greetingText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 6,
  },

  greetingName: {
    color: 'rgba(0,201,255,1)',
    fontWeight: '700',
    fontSize: 18,
  },

  ctaSection: {
    gap: 12,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaButton: {
    width: 200,
    padding: 14,
    borderRadius: 20,
    alignItems: 'center',
  },

  ctaText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },

  visualSection: {
    marginTop: 10,
    alignItems: 'center',
  },
  heroImage: {
    width: width * 0.8, // 80% ширини екрану
    height: width * 1.1, // пропорційна висота
    alignSelf: 'center',
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
