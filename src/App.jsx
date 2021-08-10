import { useState, useEffect } from 'react';
import LoaderSpin from './components/Loader/Loader.jsx';
import toast, { Toaster } from 'react-hot-toast';
import imagesApi from './servises/Api';
import { Searchbar } from './components/Searchbar/Searchbar.jsx';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Button } from './components/Button/Button';
import { Modal } from './components/Modal/Modal';
import { Container } from './App.styles';


export default function App() {
  const [imageName, setImageName] = useState('');
  const [imageGalleryList, setImageGalleryList] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [page, setPage] = useState(1);
  const [reqStatus, setReqStatus] = useState('idle');



useEffect(() => {
  if (!imageName) return;
  setReqStatus('pending');

  imagesApi.fetchImages(imageName, page).then(data => {
    if (data.length === 0 && page === 1) {
      toast.error('Ведите запрос');
      setReqStatus('idle');
      return;
    }
    if (data.length === 0 && page > 1) {
      toast.error('Картинок нет');
      setReqStatus('idle');
      return;
    }
    const images = data.map(({ id, webformatURL, largeImageURL }) => ({
      id,
      webformatURL,
      largeImageURL,
    }));
   
    setImageGalleryList(prev => [...prev, ...images]);
    setReqStatus('resolved'),
    });
  
}, [page, imageName]);

useEffect(() => {
  if (imageGalleryList.length <= PER_PAGE) return;
  handleScroll();
}, [imageGalleryList]);


 const handleFormSubmit = imageName => {
    if (imageName.trim() !== '') {
      setPage(1);
    setImageGalleryList([]);
        setImageName(imageName)
      return;
    }
    toast.error('Ваш запрос не дал результатов');
  };

  handleSearch = () => {
    const { imageName, page } = this.state;
    this.setState({ reqStatus: 'pending' });

    imagesApi
      .fetchImages(imageName, page)
      .then(imagesData => this.handleSearchData(imagesData));
  };
   
 const handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  const toggleModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      setShowModal(prev => !prev);
    }
  };

const  handleClickImages = (e, url) => {
    setImgUrl(url);
    toggleModal(e);
  };

  
    return (
      <Container>
        <Searchbar onSubmit={handleFormSubmit} />
        {imageGalleryList.length > 0 && (
          <ImageGallery
            imageGalleryList={imageGalleryList}
            alt={imageName}
            handleClick={handleClickImages}
          />
        )}
        {reqStatus === 'pending' && <LoaderSpin />}
        {reqStatus === 'resolved' && (
          <Button onClick={()=> setPage(prev = prev+1)} />
        )}
        {showModal && (
          <Modal alt={imageName} url={imgUrl} closeModal={toggleModal} />
        )}
        <Toaster position="top-right"/>
      </Container>
    );
  }






