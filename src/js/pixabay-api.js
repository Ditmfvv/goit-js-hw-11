export const fetchPhotosByQuery = searchQuery => {
    const searchParams = new URLSearchParams({
      key: '48729449-8dc77fb28ea9fafa38a1576eb',
      q: searchQuery,
    });
  
    return fetch(`https://pixabay.com/api/?${searchParams}&image_type=photo&orientation=horizontal&safesearch=true`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      });
  };