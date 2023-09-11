import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { AppWrapper } from './App.styled';
import fetchImg from 'services/PixabayAPI';
import SearchBar from '../Searchbar';
import ImgGallery from '../ImageGallery';
import Loader from '../Loader';
import BtnLoadMore from '../Button';
import Modal from '../Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }

    const getImages = async () => {
      toggleLoading();

      await fetchImg(query, page)
        .then(data => {
          if (data.hits.length === 0) {
            toast.error(`Ooops, we cant't find such query! Try again!`);
            return;
          }

          setImages(prevImages => [...prevImages, ...data.hits]);
          setTotalHits(data.totalHits);
        })
        .then()
        .catch(error => console.log(error.message))
        .finally(toggleLoading);
    };
    getImages();
  }, [query, page]);

  const toggleLoading = () => {
    setIsLoading(isLoading => !isLoading);
  };

  const handleSubmit = newQuery => {
    if (query === newQuery) {
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleSelectedImage = (webformatURL, largeImageURL) => {
    setSelectedImage(webformatURL);
    setLargeImageURL(largeImageURL);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showBtn = images.length < totalHits && images.length > 0;

  return (
    <AppWrapper>
      <SearchBar onSubmit={handleSubmit} />
      <ImgGallery images={images} onSelect={handleSelectedImage} />
      {selectedImage && (
        <Modal onClose={handleCloseModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
      {isLoading && <Loader />}
      {showBtn && <BtnLoadMore onBtnClick={handleClick} />}

      <ToastContainer autoClose={3000} />
    </AppWrapper>
  );
};
