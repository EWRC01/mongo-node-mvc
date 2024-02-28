var express = require('express');
var bodyParser = require('body-parser');
var dbConnection = require('./app');
var productRoutes = require('./api/routes/productRoutes');
var userRoutes = require('./api/routes/userRoutes');
var authRoutes = require('./api/routes/authRoutes');

const port = process.env.PORT;
const app = express();


app.use(bodyParser.json());
app.use("/", productRoutes);
app.use("/", userRoutes);
app.use("/", authRoutes);


app.listen(port, () => {
    console.log(`Server start on port: ${process.env.PORT}`);
})

