export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Auth: undefined;
  AuthSwitcher: undefined;
  LoginForm: { callbackScreen?: keyof RootStackParamList };
  RegisterForm: { callbackScreen?: keyof RootStackParamList };
  EmailForm: undefined;
  GoogleCallback: { accessToken?: string } | undefined;
  CheckEmail: undefined;
  ResetPassword: { token?: string };
};

export type CallbackScreen =
  | 'Welcome'
  | 'Home'
  | 'Auth'
  | 'AuthSwitcher'
  | 'LoginForm'
  | 'RegisterForm'
  | 'EmailForm'
  | 'GoogleCallback'
  | 'ResetPassword'
  | 'CheckEmail';
