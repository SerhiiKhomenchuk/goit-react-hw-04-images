import PropTypes from 'prop-types';
import { ImageGalleryItemImage } from './ImageGalleryItemImage.styled';
import { ImageGalleryItemStyled } from './ImageGalleryItemStyled.styled';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

const ImageGalleryItem = ({ tagImage, smallImage, largeImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ImageGalleryItemStyled>
        <ImageGalleryItemImage
          src={smallImage}
          alt={tagImage}
          onClick={openModal}
        />
        {isModalOpen && (
          <Modal
            closeModal={closeModal}
            largeImage={largeImage}
            imageDescription={tagImage}
          />
        )}
      </ImageGalleryItemStyled>
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  tagImage: PropTypes.string.isRequired,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
