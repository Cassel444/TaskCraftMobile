import { useEffect, useState } from 'react';
import { Linking } from 'react-native';

export function useCallbackUrl() {
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleUrl = ({ url }: { url: string }) => {
      // url може бути типу "taskcraft://auth/google/callback?callbackUrl=Home"
      const queryString = url.split('?')[1] || '';
      const params = Object.fromEntries(
        queryString.split('&').map((p) => p.split('=').map(decodeURIComponent)),
      );
      if (params.callbackUrl) {
        setCallbackUrl(params.callbackUrl);
      }
    };

    const subscription = Linking.addEventListener('url', handleUrl);

    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) handleUrl({ url: initialUrl });
    })();

    return () => subscription.remove();
  }, []);

  return callbackUrl;
}
