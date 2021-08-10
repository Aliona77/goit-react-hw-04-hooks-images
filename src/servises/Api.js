import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY = '21758242-df60cf310fb09062fe07e2a40';
const per_page = 12;

const fetchImages = async (imageName, page = 1) => {
  const { data } = await axios.get(
    `?q=${imageName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`,
  );
  return data.hits;
};

const imagesApi = {
  fetchImages,
};

export default imagesApi;

// import axios from 'axios';

// axios.defaults.baseURL = 'https://pixabay.com/api';
// const KEY = '21758242-df60cf310fb09062fe07e2a40';
// const per_page = 12;

// export const fetchImages = async (imageName, page=1) => {
//   const params="fields=id;webformatURL;largeImageURL"
//    const response = await axios.get(
//         `?q=${imageName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}?${params}`,
//    )
//   return response.data.hits;

// }
