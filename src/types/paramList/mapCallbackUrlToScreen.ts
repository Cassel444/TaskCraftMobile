import { CallbackScreen } from './types';

export const mapCallbackUrlToScreen = (url: string): CallbackScreen => {
  if (!url) return 'Home';

  // прості шляхи
  if (url.includes('home')) return 'Home';
  if (url.includes('login')) return 'LoginForm';
  if (url.includes('register')) return 'RegisterForm';
  if (url.includes('check-email')) return 'EmailForm';

  // випадки з Google OAuth
  if (url.startsWith('taskcraft://')) {
    const path = url.replace('taskcraft://', '');

    if (path === 'home') return 'Home';
    if (path === 'login') return 'LoginForm';
    if (path === 'register') return 'RegisterForm';
    if (path === 'auth/google/callback') return 'GoogleCallback';
  }

  return 'Home'; // дефолт
};
