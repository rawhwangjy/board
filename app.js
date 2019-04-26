var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var methodOverride  = require('method-override');
var bodyParser = require('body-parser');
var mongoose    = require('mongoose');
var supervisor  = require('supervisor');

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'));



app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', __dirname + '/views/partials');
var hbs = exphbs.create({
    extname: '.hbs', // .hbs 확장자 사용하겠다~ 엔진, 셋업 모두 변경해야함.
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/layouts/inc'
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs'); // handlebars 등록

app.use('/', require('./routes'));


var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("웹 서버 연결 OK");
});


var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("몽고디비 연결 OK");
});
mongoose.connect('mongodb://localhost/boards', { useNewUrlParser: true });