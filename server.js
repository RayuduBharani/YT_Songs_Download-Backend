const express = require('express');
const app = express();
const ytSearch = require('yt-search');
const cors = require('cors');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const dotenv = require('dotenv')

require('dotenv').config()

ffmpeg.setFfmpegPath(ffmpegPath);

app.use(cors());

const songsData = [];
app.get("/home/:id", async (req, res) => {
  try {
    songsData.length = 0;

    const r = await ytSearch(req.params.id);
    const videos = r.videos.slice(0, 15);
    videos.forEach((video) => {
      const views = String(video.views).padStart(10, ' ');
      songsData.push({
        videoId: video.videoId,
        views: video.views.toLocaleString(),
        image: video.image,
        title: video.title,
        authorName: video.author.name,
        authorUrl: video.author.url,
        url: video.url,
        ago: video.ago,
        description: video.description
      });
    });
    res.status(201).send(songsData);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "An error occurred" });
  }
});

// Helper function to handle download

const handleDownload = (videoID, bitrate, res) => {
  const url = `https://www.youtube.com/watch?v=${videoID}`;

  ytdl.getInfo(videoID).then(info => {
    const videoTitle = info.videoDetails.title.replace(/[\/\?<>\\:\*\|"]/g, '');

    res.setHeader('Content-Disposition', `attachment; filename="${videoTitle}.mp3"`);
    res.setHeader('Content-Type', 'audio/mpeg');

    const audioStream = ytdl(url, { quality: 'highestaudio' });

    ffmpeg(audioStream)
      .audioBitrate(bitrate)
      .toFormat('mp3')
      .on('error', (err) => {
        console.error('Error during conversion:', err);
        if (!res.headersSent) {
          res.status(500).send({ message: 'An error occurred during the conversion process' });
        }
      })
      .on('end', () => {
        console.log('Conversion and download complete');
      })
      .pipe(res, { end: true });
  }).catch(err => {
    console.error('Error fetching video info:', err);
    if (!res.headersSent) {
      res.status(500).send({ message: 'An error occurred while fetching the video information' });
    }
  });
};

// Define the download endpoints

app.get('/download-320kb/:id', (req, res) => {
  handleDownload(req.params.id, 320, res);
});

app.get('/download-256kb/:id', (req, res) => {
  handleDownload(req.params.id, 256, res);
});

app.get('/download-128kb/:id', (req, res) => {
  handleDownload(req.params.id, 128, res);
});

app.get('/download-64kb/:id', (req, res) => {
  handleDownload(req.params.id, 64, res);
});

app.listen(process.env.PORT , '0.0.0.0', () => {
  console.log("server running");
})
