const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/assets', express.static('assets'));

// Add middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
        // Retrieve the data sent from the client-side JavaScript
        const message = req.body.message;
        const token = "<ENTER YOUR TOKEN 0000000:lajdlfasdfj HERE>";
        const chat_id = "<ENTER YOUR -chat_id HERE";
        const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${message}`;

        await axios.get(url);

        // res.render('comforted', {});
        res.status(200).json({ success: true });

    } catch (error) {
        // Handle error
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// END ROUTE

app.listen(80, () => {
    console.log(`Running on port 8080`);
})