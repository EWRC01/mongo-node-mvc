const express = require('express')
const bodyParser = require('body-parser')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
var dbConnection = require('./app');
var productRoutes = require('./api/routes/product');
var userRoutes = require('./api/routes/user');
var authRoutes = require('./api/routes/auth');
var helloRoute = require('./api/routes/hello');



const port = process.env.PORT || 3000;


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true})
    );

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express',
        version: '0.0.1',
    },
};

const options = {
    swaggerDefinition,
    apis: ['./src/api/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/", helloRoute);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


app.listen(port, () => {
    console.log(`Server start on port: ${port}`);
});



