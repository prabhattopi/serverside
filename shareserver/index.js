const express = require('express');
const axios = require("axios");
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const saveImageLocally = (imageUrl) => {
  axios.get(imageUrl, { responseType: 'arraybuffer' })
    .then((response) => {
      const buffer = Buffer.from(response.data, 'binary');
      const filename = 'image.jpg';
      const filePath = path.join(__dirname, '../random_image/src', filename);
      fs.writeFile(filePath, buffer, (err) => {
        if (err) {
          console.error('Error saving image:', err);
        } else {
          console.log('Image saved successfully!');
        }
      });
    })
    .catch((error) => {
      console.error('Error downloading image:', error);
    });
};

app.get('/fetch-image', (req, res) => {
  const imageUrl = req.query.imageUrl
  saveImageLocally(imageUrl);
  res.send('Image saved on the server.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
