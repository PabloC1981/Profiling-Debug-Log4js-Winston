import express from 'express'
import log4js from 'log4js'

const app = express()
const server = app.listen(8080,()=> console.log("Listening") )
//appenders: tipo de transport vamos a utilizar ej consola, 
//catregories: en que entorno lo vamos a usar a los appenders
//level: Tipo de prioridad para darle a las busquedas ejemplo off, faltal, error, warn,       
log4js.configure({
    appenders:{
        console:{type:"console"},
        debugFile:{type:"file",filename:"./debug.log"},
        errorsFile:{type:"file",filename:"./errors.log"},
        errorLevelFilter:{
            type:"logLevelFilter",
            level:"error",
            appender:"errorsFile"
        }
    },
    categories:{
        default:{
            appenders:["console"],level:"all"
        },
        DEV:{
            //appenders:["console"],level:"ALL"    // todos los niveles van a llegar a la cosola
            appenders:["debugFile","console"],level:"all" // se pueden poner console y salen en ambos lados
        },  
        PROD:{
            appenders:["errorLevelFilter","console"],level:"all" // RESPUESTA EN CONSOLA [2022-02-17T01:05:48.122] [ERROR] PROD - Error de Peticion
        }
    }
})

const logger = log4js.getLogger(process.env.NODE_ENV);

app.get('/', (req,res)=>{
    logger.info('Prueba Logger Info')

    res.send ("Logger")
    //RESPUESTA EN CONSOLA [2022-02-17T00:40:34.870] [INFO] DEV - Prueba Logger Info
})
app.get('/error', (req,res)=>{
    logger.error('Error de Peticion')

    res.send ("ERROR")
    //RESPUESTA EN CONSOLA [2022-02-17T00:43:24.919] [ERROR] DEV - Error de Peticion y SALE EN ROJO 
})