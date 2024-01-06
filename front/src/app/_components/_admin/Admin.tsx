'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { adminContainer, motionContainer } from './admin.css';
import AdminMenu from './AdminMenu';

export default function Admin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuOpenHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <button type="button" className={adminContainer} onClick={menuOpenHandler}>
      <div>Admin</div>
      <motion.div
        className={motionContainer}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        style={{ originY: 0 }}
      >
        <AdminMenu />
      </motion.div>
    </button>
  );
}
