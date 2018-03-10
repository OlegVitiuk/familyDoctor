import express from 'express';
import bodyParser from 'body-parser';
import * as db from './utils/databaseUtils';
import {serverPort} from '../etc/config';

db.setUpConnection();

const app = express();

app.use(bodyParser.json());

app.get('/users', (req, res) => {
    db.listOfUsers().then(data => res.send(data));
});

app.post('/users', (req, res) => {
    db.createUser(req.body).then(data => res.send(data));
});

app.delete('/users/:id', (req, res) => {
    db.deleteUser(req.params.id).then(data => res.send(data));
});

const server = app.listen(serverPort, () => {
    console.log(`server is running on port ${serverPort}`);
});