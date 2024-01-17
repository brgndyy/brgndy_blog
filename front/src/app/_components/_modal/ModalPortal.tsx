import React, { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

type ModalPortalPropsType = {
  id?: string;
};

export default function ModalPortal(props: PropsWithChildren<ModalPortalPropsType>) {
  const { id, children } = props;

  const portalElement = id ? (document.getElementById(id) as HTMLElement) : document.body;

  return <>{createPortal(children, portalElement)}</>;
}

ModalPortal.propTypes = {
  id: PropTypes.string,
};

ModalPortal.defaultProps = {
  id: null,
};
