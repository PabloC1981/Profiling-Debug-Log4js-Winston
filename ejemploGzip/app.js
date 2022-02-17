import express from 'express'
import compression from 'compression'

const app = express()
const server = app.listen(8080,()=> console.log("Listening") )

app.use(compression())
let sentense = "Prueba Gzip";
app.get('/saludo', (req,res)=>{
    let response = ""
    for(let i=0;i<1000;i++){
        response+=sentense;       // se concatena 1000 la variable response
    }
    res.send ({message:response});
})
// RESPUESTA EN LOCALHOST 11.3 kB transferred

app.get('/saludoGzip', (req,res)=>{
    let response = ""
    for(let i=0; i<1000;i++){
        response+=sentense       // se concatena 1000 la variable response
    }
    res.send ({message:response});
})
// RESPUESTA EN LOCALHOST 180 B transferred 