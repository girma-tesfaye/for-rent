const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth')

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/auth', authRoutes);

connectDB();

app.get('/', (req, res) => {
    res.send('inside server');
});

const port =  process.env.PORT ||  5000;

app.listen(port, () => console.log(`Again Listening on ${port}`));