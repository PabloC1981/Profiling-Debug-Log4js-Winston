import express from 'express'
import createLogger from './utils.js'

const app = express()
const server = app.listen(8080,()=> console.log("Listening") )
const logger = createLogger(process.env.NODE_ENV)

app.use((req,res,next)=>{
    logger.log('info',`${req.method} at ${req.path}`)
    next();
})
app.get('/', (req,res)=>{
    logger.info("Prueba Winston");
    res.send ("Winston");
    //RESPUESTA EN CONSOLA DE DEPURACION 
})
app.get('/error', (req,res)=>{
    logger.error("Error Winston");
    res.send ("Error");
    //RESPUESTA EN CONSOLA DE DEPURACION 
})
//PARA RUTA NO ACCESIBLE
app.get('/*', (req,res)=>{
    logger.warn("Error Acceso Ruta no Valida");
    res.status(404).send ({error:"Ruta Invalida"});
    //RESPUESTA EN CONSOLA DE DEPURACION [2022-02-17T08:29:26.883] [INFO] PROD - Prueba Logger Info
})