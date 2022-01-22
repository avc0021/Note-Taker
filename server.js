const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// parses incoming requests
// then it will recognize the incoming object request as json object
// lastly it will look up the files relative to static directory so its not in URL
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
  