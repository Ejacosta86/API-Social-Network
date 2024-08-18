const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
require("socialnetworkDB").config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use(routes);


//connect to the database
db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server running on http://localhost:${PORT}`);
    });
});