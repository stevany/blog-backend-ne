var express=require('express');
var app=express();//create the Express app
var bodyParser=require('body-parser');
var category=require('./routes/category');//routes defined
var role=require('./routes/role');
var tag=require('./routes/tag');
var user=require('./routes/user');

var mongoose=require('mongoose');

var MongoURI = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost:27017/blog'

mongoose.Promise = global.Promise;
mongoose.connect(MongoURI);

mongoose.connection.once('open', function() {
    console.log('connection established!');
});

mongoose.connection.on('error', function(err) {
    console.error('Could not connect.  Error:', err);
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api', category);
app.use('/api', role);
app.use('/api', tag);
app.use('/api', user);
app.get('/*', (req, res) => {
    res.redirect('/');
  });
app.get('/',function(req,res){
        res.json({"Message" : "Hello World !"});
    });


app.listen(3000);
console.log("Listening to port 3000");
