import React from 'react';
import { ImgGalleryItem, ImgGalleryItemPic } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, onSelect }) => {
  const { webformatURL, tags, largeImageURL } = image;

  const handleItemClick = () => {
    onSelect(webformatURL, largeImageURL);
  };

  return (
    <ImgGalleryItem onClick={() => handleItemClick()}>
      <ImgGalleryItemPic src={webformatURL} alt={tags} />
    </ImgGalleryItem>
  );
};

export default ImageGalleryItem;
