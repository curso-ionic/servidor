const app = require('express')();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bodyParser = require('body-parser');
const fs = require('fs');
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json());

require('./passport');

tags = ['Introduce yourself and say why you want to take this course', 'Name', 'Age', 'Prior knowledge, or taken course', 'Mobile development experience', 'General development experience'];

app.post('/auth/login', (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                status: 'error',
                message: 'Login incorrecto'
            });
        }
        const token = jwt.sign(user, 'contrasena_segura');
        return res.json({user, token});
    })(req, res);;
})

app.get('/protegido', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send(req.user);
})

app.get('/tags', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(tags);
})

app.post('/tags', passport.authenticate('jwt', { session: false }), (req, res) => {
    tags.push(req.body.tag);
    res.json(tags);
})

app.post('/grabaciones', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body);
    const nombreArchivo = req.body.nombre;
    const contenido = Buffer.from(req.body.contenido, 'base64');
    const tags = req.body.tags;
    filePath = __dirname + `/grabaciones/${nombreArchivo}`;
    fs.writeFile(filePath, contenido, err => {
        if (err) {
            res.status(500).json({ status: 'error', message: 'No se pudo guardar el archivo' });
        }
        res.json({ status: 'ok' });
    });
    
})


app.listen(3000, () => {
    console.log('Aplicacion escuchando en el puerto 3000');
})