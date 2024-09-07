import { ServerStatusCheck } from '@/lib/StatusUrl';
import { useState, useEffect } from 'react';

const checkInterval = 2 * 60 * 1000;

async function checkInternetConnection() {
  return fetch(ServerStatusCheck, { mode: 'no-cors', cache: 'no-store' })
    .then(() => true)
    .catch(() => false);
}

export function useInternetConnection() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    function checkAndUpdateConnection() {
      checkInternetConnection().then(setIsOnline);
    }

    // Initial check
    checkAndUpdateConnection();

    // Set up interval for periodic checks
    const intervalId = setInterval(checkAndUpdateConnection, checkInterval);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return isOnline;
}
