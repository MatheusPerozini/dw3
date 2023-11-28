const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

function verificaArray(array) {
    if (array.length < 2) {
        throw 'Array muito pequeno';
    }
    if (array.length > 20) {
        throw 'Array muito grande';
    }
    return array;
}

function manipulaRequest(req) {
    const { body } = req;
    return verificaArray(body.array);
}

app.post('/ordena', (req, res) => {
    try {
        const array = manipulaRequest(req);
        array.sort((a, b) => (a - b));
        res.json(array);
    } catch (err) {
        res.json({ err });
    }
});

app.post('/valores', (req, res) => {
    try {
        const array = manipulaRequest(req);
        res.json([Math.min(...array), Math.max(...array)]);
    } catch (err) {
        res.json({ err });
    }
});

app.listen(PORT, () => {
    console.log(`Executando na porta ${PORT}`)
});