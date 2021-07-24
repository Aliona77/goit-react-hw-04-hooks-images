import { ImageGalleryItemList, Image} from './ImageGalleryItem.styles';
import PropTypes from 'prop-types';


export function ImageGalleryItem({
  handleClick,
  alt,
  image: { webformatURL, largeImageURL },
}) {
  return (
    <ImageGalleryItemList>
      <Image
        src={webformatURL}
        alt={alt}
        className="ImageGalleryItem-image"
        onClick={e => handleClick(e, largeImageURL)}
      />
    </ImageGalleryItemList>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
  }).isRequired,
    alt: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
