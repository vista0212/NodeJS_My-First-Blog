const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const Free = require('./database/posts/free');
const Notice = require('./database/posts/notice');
const session = require('express-session');

const write = require('./routes/write');
const admin = require('./routes/admin');
const board = require('./routes/board');
const view = require('./routes/view');

const app = express();

require('./database/db');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: '@#@$SSR#@$#$',
    resave: false,
    saveUninitialized: true
  }));  

app.get('/', async (req, res) => {
    try{
    await Free.find({}).sort({date:-1}).limit(5).exec(async(err, rawFree)=>{
        try{
            if(err) return res.send('<script>alert("알 수 없는 오류");history.back()');
            await Notice.find({}).sort({date:-1}).limit(5).exec(function(err, rawNotice){
                if(err) return res.send('<script>alert("알 수 없는 오류");history.back()');
                return res.render('index', {title: "Blog", notice: rawNotice, free: rawFree});
            })
        } catch(err){
            return res.send('<script>alert("알 수 없는 오류");history.back()');    
        }
        })
    } catch(err){
        return res.send('<script>alert("알 수 없는 오류");history.back()');
    }
})

app.get('/main', (req, res) => {
    res.render('main');
})

app.use('/', admin);
app.use('/post', write);
app.use('/', board);
app.use('/', view)


app.set('views', './views');
app.set('view engine', 'ejs');

module.exports = app;
