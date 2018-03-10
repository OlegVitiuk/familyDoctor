import express from 'express';
import bodyParser from 'body-parser';
import * as db from './utils/databaseUtils';

db.setUpConnection();

const app = express();

app.use(bodyParser.json());

app.get('/users',(req,res)=>{
    db.listOfUsers().then(data =>res.send(data));
});

// app.get('/',(req,res)=>{
//     res.send("asfasfasadfsadfs")
// })

app.post('/users',(req,res)=>{
    db.createUser(req.body).then(data => res.send(data));
});

app.delete('/users/:id',(req,res)=>{
    db.deleteUser(req.params.id).then(data => res.send(data));
});

const server = app.listen(8080,()=>{
    console.log("server is rnning");
});