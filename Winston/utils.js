import winston from 'winston';
//creamos un canal dual para ambos entornos 
const createLogger = (env) =>{
    if(env=="PROD"){
        return winston.createLogger({
            transports:[
                new winston.transports.File({filename:"debug.log",level:"debug"}), //ME PIDEN UN ARCHIVO DE LOOGRES
                new winston.transports.File({filename:"error.log",level:"error"})
            ]
        })
    }else{
        return winston.createLogger({
            transports:[
                new winston.transports.Console({level:"info"})
            ]
        })
    }

}
export default createLogger;