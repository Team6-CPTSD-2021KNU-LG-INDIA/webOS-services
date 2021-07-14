// eslint-disable-next-line import/no-unresolved
const pkgInfo = require('./package.json');
const Service = require('webos-service');

const service = new Service(pkgInfo.name); // Create service by service name on package.json

const fs = require('fs');

service.register("read", function(message) {
    fs.readFile(message.payload.path, message.payload.encode, (err, data)=>{
        if(err){
            message.respond({
                returnValue: false,
                Response: err,
            });
        }
        else{
            message.respond({
                returnValue: true,
                Response: data,
            });
        }
    })
});