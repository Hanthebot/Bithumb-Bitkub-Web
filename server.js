const express = require('express');
const path = require('path');
const router = require("./routes/router");

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use('/src', express.static(path.join(__dirname, 'src')));

app.use('/:appId([A-z]{4})', router.app);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});