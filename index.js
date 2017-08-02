let fetch = require('node-fetch');
const url = 'http://files.peg.co/zoella_videos.json';

fetch(url)
.then((response) => response.json())
.then((data) => {
  let videos = data.videos;
})
