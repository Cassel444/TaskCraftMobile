import { getCurrentUser } from '../api/users/currentUser/getCurrentUser';

export function GlobalDataInitializer() {
  getCurrentUser();
  return null;
}
