import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { AppWrapper } from './App.styled';
import fetchImg from 'services/PixabayAPI';
import SearchBar from '../Searchbar';
import ImgGallery from '../ImageGallery';
import Loader from '../Loader';
import BtnLoadMore from '../Button';
import Modal from '../Modal';

export class App extends Component {
  state = {
    query: '',
    selectedImage: null,
    images: [],
    isLoading: false,
    page: 1,
    totalHits: null,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.getImages();
    }
  }

  toggleLoading = () => {
    this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
  };

  handleSubmit = query => {
    if (this.state.query !== query) {
      this.setState({ query: query, images: [], page: 1 });
    }
  };

  handleSelectedImage = (webformatURL, largeImageURL) => {
    this.setState({
      selectedImage: webformatURL,
      largeImageURL: largeImageURL,
    });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  handleClick = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  getImages = () => {
    this.toggleLoading();
    const { page, query } = this.state;

    fetchImg(query, page)
      .then(data => {
        if (data.hits.length === 0) {
          toast.error(`Ooops, we cant't find such query! Try again!`);
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          totalHits: data.totalHits,
        }));
      })
      .then(this.handleScroll)
      .catch(error => console.log(error.message))
      .finally(this.toggleLoading);
  };

  render() {
    const { selectedImage, images, isLoading, totalHits, largeImageURL } =
      this.state;
    const showBtn = images.length < totalHits && images.length > 0;

    return (
      <AppWrapper>
        <SearchBar onSubmit={this.handleSubmit} />
        <ImgGallery images={images} onSelect={this.handleSelectedImage} />
        {selectedImage && (
          <Modal onClose={this.handleCloseModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
        {isLoading && <Loader />}
        {showBtn && <BtnLoadMore onBtnClick={this.handleClick} />}

        <ToastContainer autoClose={3000} />
      </AppWrapper>
    );
  }
}
