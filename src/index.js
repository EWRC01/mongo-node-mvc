const express = require('express'),
 bodyParser = require('body-parser'),
 swaggerJSDoc = require('swagger-jsdoc'),
 swaggerUI = require('swagger-ui-express')
var dbConnection = require('./app');
var productRoutes = require('./api/routes/productRoutes');
var userRoutes = require('./api/routes/userRoutes');
var authRoutes = require('./api/routes/auth');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

const options  = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "App example API",
            version: "0.0.1",
            description: "This is an application with MongoDB and Node.js",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "EWRC01",
                url: "https://ewrc01.github.io/",
                email: "edwin1026@hotmail.es",
            }, 
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./api/routes/*.js"],
};


const port = process.env.PORT || 3000;

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, {explorer:true}));



app.listen(port, () => {
    console.log(`Server start on port: ${port}`);
})

