let fetch = require('node-fetch');
const url = 'http://files.peg.co/zoella_videos.json';

fetch(url)
.then((response) => response.json())
.then((data) => {
  let videos = data.videos;
  titleOfHighestPercentageLikes(videos);
  meanPercentOfLikes(videos);
  totalOfViews(videos);
  averageTimeInterval(videos);
})
.catch((error) => {
  console.log(error.message);
})

const percentOfLikes = (likes, dislikes) => {
  if (likes === 0 && dislikes === 0) return 0;
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
  console.log('Title of highest percent of likes =>', highest.title);
  return highest.title;
};

const meanPercentOfLikes = (videos) => {
  let total = 0;
  videos.forEach((video) => {
    total += percentOfLikes(video.likes, video.dislikes);
  })
  let mean = Math.round(total / videos.length);
  console.log('The mean percent of all videos =>', mean + '%');
  return mean;
}

const totalOfViews = (videos) => {
  let views = 0;
  videos.forEach((video) => {
    views += video.views;
  })
  console.log('Total of views of all videos =>', views.toLocaleString() + ' views');
  return views;
}

const totalTimeDifference = (times) => {
  let diff = times.slice(1).map((number, index) => {
    return Math.abs(number - times[index]);
  });
  let totalDiff = diff.reduce((sum, value) => {
    return sum + value;
  });
  return totalDiff;
}

const averageTimeInterval = (videos) => {
  let times = videos.map((video) => {
    return new Date(video.published_at).getTime();
  });
  let average = totalTimeDifference(times) / (times.length - 1);
  let diffDays = Math.ceil(average / (1000 * 3600 * 24));
  console.log('The average time between each video posted =>', diffDays + ' days');
  return diffDays;
}
