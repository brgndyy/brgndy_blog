import React, { PropsWithChildren, useContext } from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from './ModalContext';

type ModalClosePropsType = {
  className?: string;
  // onClick?: () => void;
};

export default function ModalClose(props: PropsWithChildren<ModalClosePropsType>) {
  const { children, className } = props;
  const { modalCloseHandler } = useContext(ModalContext);

  const closeClassName = className || '';

  return (
    <button type="button" className={closeClassName} onClick={modalCloseHandler}>
      {children}
    </button>
  );
}

ModalClose.propTypes = {
  className: PropTypes.string,
};

ModalClose.defaultProps = {
  className: null,
};
