const API_KEY= 'c501e32c61a398a8ae19c9fc59a13fe0';

const constructGetImagesUrl = 
  (page = 1, per_page = 20) => (`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&page=${page}&per_page=${per_page}&format=json&nojsoncallback=1`);

export function getImages(page) {
  const url = constructGetImagesUrl(page);
  
  return fetch(url)
      .then(
        res => res.json(),
        (err) => console.log(err)
      );
}
