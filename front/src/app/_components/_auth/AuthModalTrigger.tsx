'use client';

import React from 'react';
import Auth from './Auth';
import Modal from '../_modal/Modal';

export default function AuthModalTrigger() {
  return (
    <Modal>
      <Auth />
    </Modal>
  );
}
