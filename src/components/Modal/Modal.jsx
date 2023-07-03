import PropTypes from 'prop-types';

import { ModalStyled } from './ModalStyled.styled';
import { Overlay } from './Overlay.styled';
import { useEffect } from 'react';

export function Modal({ closeModal, largeImage, imageDescription }) {
  useEffect(() => {
    const onEscClick = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', onEscClick);
    return () => {
      document.removeEventListener('keydown', onEscClick);
    };
  }, [closeModal]);

  

  const onOverlayClick = e => {
    if (e.target.name === e.currentTarget.name) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={onOverlayClick}>
      <ModalStyled>
        <img src={largeImage} alt={imageDescription} />
      </ModalStyled>
    </Overlay>
  );
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  imageDescription: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
