import React from 'react';
import { BMHANNAAir, BMHAANAPro } from '@/app/_styles/fonts/fonts';
import { myStyle } from '@/app/_styles/vars.css';
import { infoContainer, infoText, nickName } from './profileInfo.css';

export default function ProfileInfo() {
  return (
    <div className={`${infoContainer} ${BMHANNAAir.className} ${myStyle}`}>
      <p className={infoText}>안녕하세요</p>
      <p className={infoText}>
        창작의 관점에서 문제를 해결하기 위해 노력하는{' '}
        <strong className={`${nickName} ${BMHAANAPro.className}`}>BRGNDY</strong>
        입니다 🫡
      </p>
    </div>
  );
}
