import PropTypes from 'prop-types';
import { ImageGalleryList } from "./ImageGallery.styles";
import {ImageGalleryItem} from "../ImageGalleryItem/ImageGalleryItem";



export function ImageGallery({ imageGalleryList, alt, handleClick }) {
  return (
    <ImageGalleryList>
      {imageGalleryList.map((image) => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          alt={alt}
          handleClick={handleClick}
      
        />
      ))}

    </ImageGalleryList>
  )
}
ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};


