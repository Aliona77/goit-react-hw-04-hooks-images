import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ImageModal } from './Modal.styles';
import { useEffect } from 'react';


const ModalRoot = document.querySelector('#modal-root');

export default function Modal({ alt, url, closeModal }) {
  
  useEffect(() => {
    const handleKeyDown = e => {
      console.log("handleKeyDown");
      closeModal(e);
    };

  
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [closeModal]);

    return createPortal(
      <Overlay onClick={closeModal}>
        <ImageModal>
          <img src={url} alt={alt} />
        </ImageModal>
      </Overlay>,
      ModalRoot,
    );
  }

  Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};