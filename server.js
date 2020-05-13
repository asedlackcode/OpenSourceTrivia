var express = require("express");
var PORT = process.env.PORT || 8000;
var app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, function() {
    console.log("listening on port: http://localhost:" + PORT);
});
