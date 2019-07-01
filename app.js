const app = require('express')();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bodyParser = require('body-parser');
var cors = require('cors')

app.use(bodyParser.json());
app.use(cors())

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


app.listen(3000, () => {
    console.log('Aplicacion escuchando en el puerto 3000');
})