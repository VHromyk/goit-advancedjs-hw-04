import axios from 'axios';

export async function getImagesByQuery({ query, page }) {
  const searchQuery = new URLSearchParams({
    q: query,
    key: '19790179-de8e0f050de34d9c55fd8172a',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 15,
  });

  const response = await axios.get(`https://pixabay.com/api/?${searchQuery}`);
  return response.data;
}