import axios from 'axios';

const API_KEY = '47549535-932fbadf252bf563d10ac391d';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(search, page = 1, per_page = 15) {
  const searchParams = {
    key: API_KEY,
    q: search,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page,
  };
  try {
    const { data } = await axios.get(BASE_URL, { params: searchParams });
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}