const express = require('express');
const loginRoute = require('./routes/login.route');
const postRoute = require('./routes/post.route');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', loginRoute);
app.use('/api', postRoute);

app.get('/ping', (req, res) => {
  res.send('pong');
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
