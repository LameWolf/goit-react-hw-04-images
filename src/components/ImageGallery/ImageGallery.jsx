import React from 'react';
import { ImageGallery } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/';

const ImgGallery = ({ images, onSelect }) => {
  return (
    <ImageGallery>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} onSelect={onSelect} />
      ))}
    </ImageGallery>
  );
};

export default ImgGallery;
