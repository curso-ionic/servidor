# Proyecto Interviewer
## Módulo servidor

## API

### Login

#### POST /auth/login

##### Petición

```
{
    username: '',
    password: ''
}
```

##### Respuesta


** Ok - Status 200**
```
{
    status: 'ok',
    token: '',
    user: {
        id: 0,
        username: ''
    }
}
```

** Error - Status 400**
```
{
    status: 'error',
    message: 'Login incorrecto',
}
```