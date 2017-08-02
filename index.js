let fetch = require('node-fetch');
const url = 'http://files.peg.co/zoella_videos.json';

fetch(url)
.then((response) => response.json())
.then((data) => {
  let videos = data.videos;
  titleOfHighestPercentageLikes(videos);
})

const percentOfLikes = (likes, dislikes) => {
  return likes / (likes + dislikes) * 100;
};

const titleOfHighestPercentageLikes = (videos) => {
  let highest = {
    percent: 0,
    title: undefined
  };
  videos.forEach((video) => {
    let percent = percentOfLikes(video.likes, video.dislikes);
    if (percent > highest.percent) {
      highest.percent = percent;
      highest.title = video.title;
    }
  })
  console.log('Title of highest % of likes =>', highest.title);
  return highest.title;
};
