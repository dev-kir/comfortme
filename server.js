const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const requestIP = require('request-ip');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/assets', express.static('assets'));

// Add middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestIP.mw());

// THIS IS ROUTE
app.get("/", (req, res) => {
    res.render('index', {});
})

app.post("/comforted", (req, res) => {
    try {
        // Retrieve the data sent from the client-side JavaScript
        const { location, description } = req.body;
        res.render('comforted', { location, description });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

const axios = require('axios');
app.post("/tete", async (req, res) => {
    try {
        // Retry logic
        let retries = 15; // Number of retries
        while (retries > 0) {
            try {
                // const token = "<ENTER YOUR TOKEN 0000000:lajdlfasdfj HERE>";
                // const chat_id = "<ENTER YOUR -chat_id HERE>";
                
                const ipAddress = req.socket.remoteAddress;
                const message = "("+ ipAddress + "): " + req.body.message;
                await axios.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${message}`);
                res.status(200).json({ success: true });
                return; // Exit the function after successful request
            } catch (error) {
                console.error("Error:", error);
                retries--; // Decrement the number of retries
            }
        }
    } catch (error) {
        // Handle error
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// route random links to root
app.get("*", (req, res) => {
    res.redirect('/');
})

// END ROUTE

app.listen(8000, () => {
    console.log(`Running on port 8080`);
})