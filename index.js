const fs = require('fs');

const express = require('express');

const app = express();

app.use(express.json());

app.use(express.static(__dirname + '/frontend/build'));

let db = JSON.parse(fs.readFileSync('db.json')).feedback;

let getId = () => {
    let res = -1;
    for (let x of db) {
        res = Math.max(x.id, res);
    }
    return res;
};

app.get('/feedback', (req, res) => {
    res.status(200);
    res.contentType('application/json');
    res.send(JSON.stringify(db));
});

app.post('/feedback', (req, res) => {
    let obj = {
        id: getId(),
        rating: req.body.rating,
        text: req.body.text
    };
    db.push(obj);
    res.status(201);
    res.contentType('application/json');
    res.send(JSON.stringify(obj));
});

app.delete('/feedback/:id', (req, res) => {
    db = db.filter((x, i) => {
        return x.id != req.params.id;
    });
    res.status(200);
    res.send('');
});

app.put('/feedback/:id', (req, res) => {
    let y = null;
    for (let x of db) {
        if (x.id == req.params.id) {
            y = x;
            x.rating = req.body.rating;
            x.text = req.body.text;
        }
    }
    res.status(200);
    res.contentType('application/json');
    res.send(JSON.stringify(y));
});

app.listen(3000);