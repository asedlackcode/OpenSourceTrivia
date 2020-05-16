var express = require("express");
var PORT = process.env.PORT || 8000;
var app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var ExHb = require("express-handlebars");

app.engine('handlebars', ExHb({ defaultLayout: 'main' }) )
app.set('view engine', 'handlebars');


var loginRoute = require("./routes/login");

app.use(loginRoute);

app.listen(PORT, function() {
    console.log("listening on port: http://localhost:" + PORT);
});
