const express = require('express');
const app = express();
const PORT = 4000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Home');
});

// my routes
const questions = require('./Routes/index');

app.use('/api', questions);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

app.listen(PORT || 5000, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
