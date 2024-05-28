const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { default: axios } = require('axios');
const packageDefinition = protoLoader.
    loadSync(path.join(__dirname, '../protos/degree.proto'));
const degreeProto = grpc.loadPackageDefinition(packageDefinition);

async function findDegree(call, callback) {
    try {
        console.log("vcddfdd")
        const data = await axios.get('https://fakestoreapi.com/products');

        callback(null, {
            message: 'Degree found',
            data: data.data
        });
    } catch (error) {
        callback({
            message: 'Degree not found',
            code: grpc.status.INVALID_ARGUMENT
        });
    }
}
const server = new grpc.Server();
server.addService(degreeProto.Degrees.service, { find: findDegree });
server.bindAsync('0.0.0.0:50053', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});