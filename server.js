const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category');
const assetRoutes = require('./routes/asset');

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/asset', assetRoutes);

connectDB();

app.get('/', (req, res) => {
    res.send('inside server');
});

const port =  process.env.PORT ||  5000;

app.listen(port, () => console.log(`Listening on port ${port}`));