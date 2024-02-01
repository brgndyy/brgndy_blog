import { useState, useEffect } from 'react';
import CONFIG from '../_constants/config';

const useKeyDown = () => {
  const [modalType, setModalType] = useState('');
  const [typedKeys, setTypedKeys] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setTypedKeys((keys) => keys + event.key);
    };

    window.addEventListener('keydown', handleKeyDown);

    if (typedKeys === process.env.NEXT_LOGIN_SECRET_KEY) {
      setModalType(CONFIG.modal_login_type);
    } else if (typedKeys === process.env.NEXT_SIGN_UP_SECRET_KEY) {
      setModalType(CONFIG.modal_sign_up_type);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [typedKeys]);

  return [modalType];
};

export default useKeyDown;
