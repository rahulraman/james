module.exports = function (mongoose) {

   // var dbURI = 'mongodb://122.176.20.171:27017/chat';
   var dbURI = 'mongodb://chat:chat@ds231205.mlab.com:31205/chat';
   mongoose.Promise = global.Promise;
    var connection = mongoose.createConnection(dbURI, { server: { poolSize: 5 } });

    // When successfully connected
    connection.on('connected', function () {
        console.log('Mongoose connection open to ' + dbURI);
    });

    // If the connection throws an error
    connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function () {
        connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    return connection;
}