// eslint-disable-next-line import/no-unresolved
const pkgInfo = require('./package.json');
const Service = require('webos-service');

const service = new Service(pkgInfo.name); // Create service by service name on package.json

const fs = require('fs');
let path = "/home/root/texts"

service.register("read", function(message) {
    fs.readFile(path+"/"+message.payload.name, message.payload.encode, (err, data)=>{
        if(err){
            message.respond({
                returnValue: false,
                Response: err.toString(),
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
service.register("ls", function(message) {
    fs.readdir(path, (err, data)=>{
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
service.register("setpath", function(message) {
    if(message.payload.path){
        path = message.payload.path;
    }
    message.respond({
        returnValue:true,
        Response: path,
    });
});