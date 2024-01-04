import React from 'react';
import Image from 'next/image';
import { profileImageContainer, profileImage } from './profileImage.css';

export default function ProfileImage() {
  return (
    <div className={profileImageContainer}>
      <Image
        className={profileImage}
        src="/images/profile.jpeg"
        width={150}
        height={150}
        alt="profileImage"
      />
    </div>
  );
}
