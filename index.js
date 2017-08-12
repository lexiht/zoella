let fetch = require('node-fetch');
let _ = require('lodash');
const url = 'http://files.peg.co/zoella_videos.json';

fetch(url)
.then((response) => response.json())
.then((data) => {
  let videos = data.videos;
  console.log('Title of highest percent of likes =>', titleOfHighestPercentageLikes(videos));
  console.log('The mean percent of all videos =>', meanPercentOfLikes(videos) + '%');
  console.log('Total of views of all videos =>', totalOfViews(videos).toLocaleString() + ' views');
  console.log('The average time between each video posted =>', averageTimeInterval(videos) + ' days');
})
.catch((error) => {
  console.log(error.data.message);
})

const percentOfLikes = (likes, dislikes) => {
  if (likes === 0 && dislikes === 0) return 0;
  return likes / (likes + dislikes) * 100;
};

const titleOfHighestPercentageLikes = (videos) => {
  let highest = _.maxBy(videos, (video) => {
    return percentOfLikes(video.likes, video.dislikes);
  });
  return highest.title;
};

const meanPercentOfLikes = (videos) => {
  let mean = _.meanBy(videos, (video) => {
    return percentOfLikes(video.likes, video.dislikes);
  });
  return Math.round(mean);
}

const totalOfViews = (videos) => {
  let sum = _.sumBy(videos, (video) => {
    return video.views;
  });
  return sum;
}

const averageTimeInterval = (videos) => {
  let recent = new Date(videos[0].published_at).getTime();
  let oldest = new Date(videos[_.findLastKey(videos, 'published_at')].published_at).getTime();
  let average = (recent - oldest) / (videos.length - 1);
  let diffDays = average / (1000 * 3600 * 24);
  return Math.round(diffDays);
}
