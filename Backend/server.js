const http = require('http');
const app = require('./app');
const {installSocket} = require('./socket');
const server = http.createServer(app);
const port = process.env.PORT || 3000;

installSocket(server);

server.listen(port,"0.0.0.0",()=>{
    console.log(`Server running on port ${port}`);
});