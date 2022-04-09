const express = require('express');
const cors = require('cors');
const route = require('./routes');
const { connect } = require('./database/db')

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(route);


app.listen(PORT, async () => {
    await connect()
    console.log("App is running on http://localhost:5000")
});