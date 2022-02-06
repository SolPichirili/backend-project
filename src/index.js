const cluster = require('cluster');
const numCPUS = require('os').cpus().length;
const logger = require('./utils/winston');
const { Server: HttpServer } = require('http');
const server = require('./server');

const isCluster = process.argv[2] === 'CLUSTER';

const httpServer = new HttpServer(server);

let port = process.env.PORT || 8080;

if (cluster.isMaster && isCluster) {

    for (let i = 0; i < numCPUS; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        logger.info(`Worker ${worker.process.pid} died ${new Date().toLocaleString()}`);
        cluster.fork();
    })
} else {

    const app = httpServer.listen(port, () => {
        logger.info(`Servidor corriendo en ${port}`);
    });

    app.on('error', (error) => {
        logger.error(`Error: ${error}`);
    });

}
