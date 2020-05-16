var express = require("express");
var exphbs = require("express-handlebars");
var apiRoutes = require("./routes/apiRoutes.js"); 



// Initialize the app and create port
var PORT = process.env.PORT || 8000;
var app = express();

app.use(express.static("public"));

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/api", apiRoutes);


//Start the Server
app.listen(PORT, function() {
    console.log("listening on port: http://localhost:" + PORT);
});
