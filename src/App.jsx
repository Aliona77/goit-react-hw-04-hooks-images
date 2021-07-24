import { Component } from 'react';
import LoaderSpin from './components/Loader/Loader.jsx';
import toast, { Toaster } from 'react-hot-toast';
import imagesApi from './servises/Api';
import { Searchbar } from './components/Searchbar/Searchbar.jsx';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Button } from './components/Button/Button';
import { Modal } from './components/Modal/Modal';
import { Container } from './App.styles';

export const App = () =>{}


export class App extends Component {
  state = {
    imageName: '',
    imageGalleryList: [],
    showModal: null,
    imgUrl: '',
    page: 1,
    reqStatus: 'idle',
  };

  componentDidUpdate(_, prevState) {
    const { imageName, imageGalleryList } = this.state;

    if (prevState.imageName !== imageName) {
      this.setState({ imageGalleryList: [], page: 1 });
      this.handleSearch();
    }
    if (
      prevState.imageGalleryList !== imageGalleryList &&
      prevState.imageGalleryList.length !== 0
    ) {
      this.handleScroll();
    }
  }

  handleFormSubmit = imageName => {
    if (imageName.trim() !== '') {
      this.setState({ imageName });
      return;
    }
    toast.error('Ведите запрос');
  };

  handleSearch = () => {
    const { imageName, page } = this.state;
    this.setState({ reqStatus: 'pending' });

    imagesApi
      .fetchImages(imageName, page)
      .then(imagesData => this.handleSearchData(imagesData));
  };
  handleSearchData = data => {
    const { page } = this.state;

    if (data.length === 0 && page === 1) {
      toast.error('Ваш запрос не дал результатов');
      this.setState({ reqStatus: 'idle' });
      return;
    }
    if (data.length === 0 && page > 1) {
      toast.error('Картинок нет');
      this.setState({ reqStatus: 'idle' });
      return;
    }
    const images = data.map(({ id, webformatURL, largeImageURL }) => ({
      id,
      webformatURL,
      largeImageURL,
    }));

    this.setState(prevState => ({
      imageGalleryList: [...prevState.imageGalleryList, ...images],
      page: prevState.page + 1,
      reqStatus: 'resolved',
    }));
  };
  handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  toggleModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      this.setState(({ showModal }) => ({ showModal: !showModal }));
    }
  };

  handleClickImages = (e, url) => {
    this.setState({ imgUrl: url });
    this.toggleModal(e);
  };

  render() {
    const { imageGalleryList, imageName, reqStatus, showModal, imgUrl } =
      this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {imageGalleryList.length > 0 && (
          <ImageGallery
            imageGalleryList={imageGalleryList}
            alt={imageName}
            handleClick={this.handleClickImages}
          />
        )}
        {reqStatus === 'pending' && <LoaderSpin />}
        {reqStatus === 'resolved' && (
          <Button onClick={this.handleSearch} />
        )}
        {showModal && (
          <Modal alt={imageName} url={imgUrl} closeModal={this.toggleModal} />
        )}
        <Toaster />
      </Container>
    );
  }
}
export default App;
