import { useState } from 'react';
import { googleAuth } from '../api/auth/googleAuth';

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await googleAuth();
    } catch (e) {
      console.error('GoogleAuth error', e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { signInWithGoogle, loading };
};
