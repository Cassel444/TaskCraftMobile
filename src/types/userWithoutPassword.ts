import { Board } from './board';

export interface UserWithoutPassword {
  id: string;
  username: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string | null;
  theme: string;
  notifications: boolean;
  refreshToken?: string | null;
  googleId?: string | null;
  passwordResetToken?: string | null;
  avatarPath?: string | null;
  timezone?: string | null;
  emailChangeToken?: string | null;
  pendingEmail?: string | null;
  currentStreak?: number;
  longestStreak?: number;
  WorkDesk?: Board[];
}
