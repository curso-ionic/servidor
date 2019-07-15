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


### Tags

#### GET /tags

Retorna un JSON con los tags cargados en el servidor.

** Requiere autenticación **

```
[
    "Familia",
    "Amigos",
    "Trabajo",
    "Politica",
    "Otro"
]
```

#### POST /tags

Agrega un nuevo tag y retorna un JSON con los tags cargados en el servidor.

** Requiere autenticación **

##### Petición

```
{
    "tag": "<nuevo tag a agregar>"
}
```

##### Respuesta
```
[
    "Familia",
    "Amigos",
    "Trabajo",
    "Politica",
    "<nuevo tag agregado"
]
```

## Autenticación

Se debe enviar el token recibido en el login en el encabezado de la petición

``` Authorization: Bearer <token> ```






### Grabaciones


#### POST /grabaciones

Guarda la grabacion en el servidor.

** Requiere autenticación **

##### Petición

```
{
    "archivo": "<nombre del archivo>",
    "contenido": "<contenido del archivo en base64>,
    "tags": [
        "nombre": "<nombre de la etiqueta>",
        "posiciones": [<lista de posiciones en donde aparece la etiqueta>]
    ]
}
```

##### Respuesta
```
status: ok
```

## Autenticación

Se debe enviar el token recibido en el login en el encabezado de la petición

``` Authorization: Bearer <token> ```