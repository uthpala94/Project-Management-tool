const express = require('express');
const bodyParser = require('body-parser'); //middleware module to handle form data
const path = require('path'); // string concatinating for joining paths


const api = require('./server/routes/api');
const user = require('./server/routes/user');
const task = require('./server/routes/task');
const Swal = require('sweetalert2');
const port = 3000;// port for the server
const app = express();//instance for express

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });

app.use(express.static(path.join(__dirname,'dist')));//access to the distributable folder

app.use(bodyParser.urlencoded({extended:true}));//parse the text as urlencoded data
app.use(bodyParser.json());//parse the text as json



app.use('/api',api);
app.use('/user',user);
app.use('/task',task);


app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'));
});
 
app.listen(port,function(){
    console.log("server running on localhost "+port);
});