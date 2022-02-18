import express from 'express'
import cluster from 'cluster'
import {cpus} from 'os'
import isPrime from './utils.js';

const PORT = parseInt(process.argv[2])||8080;
const isCluster = process.argv[3] ==="CLUSTER";

if(isCluster&&cluster.isMaster){
    //INSTANCIAR A MIS WORKERS
    const numCPUs = cpus().length;
    console.log(`PID Master: ${process.pid}`);
    for(let i=0;i<numCPUs;i++){
        cluster.fork();
    }
    cluster.on('exit',worker=>{
        console.log(`worker ${worker.process.pid} Baja `)
        cluster.fork();
    })
}
else{
    const app = express()
    app.get('/', (req,res) =>{
        const primes = [];
        const max = Number(req.query.max)||1000;
        for(let i = 1;i<=max;i++){
            if(isPrime(i)) primes.push(i)
        }
        res.send(primes)
    })
    app.listen(PORT,()=>console.log(`PID worker working on PORT: ${PORT}`))   
}
// respuesta de consola PID worker working on PORT: 8080
//consulta artillery quick --count 100 -n 20 http://localhost8080?max=100000 >result_fork.txt
//result en archivo txt
//node app.js 8080 CLUSTER
//respuesta :
// PID worker working on PORT: 8080
// PID worker working on PORT: 8080
// PID worker working on PORT: 8080
// PID worker working on PORT: 8080
