import { type GiphyRandomResponse } from "../data/giphy.response";

export const API_KEY = "0k9KQKoH8wiEPn2ak09veulSWSgooDru";

const myRequest = fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`);

myRequest
// .then((data) => {
//   data.json().then((data) => {
//     console.log(data);
//   });
// })
.then(response => response.json())
.then((data: GiphyRandomResponse) => {
    const imageUrl = data.data.images.original.url;
    console.log(imageUrl);

    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    
    document.body.appendChild(imageElement);
})
.catch((error) => {
  console.error('Error fetching data:', error);
});