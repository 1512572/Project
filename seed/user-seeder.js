var User = require('../models/user');
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:abcd1234@ds245680.mlab.com:45680/group2webproject');

var encryptMachine = new User;
var encPass = encryptMachine.encryptPassword('admin');
var users = [
    new User({
        email: 'admin@test.com',
        password: encPass,
        name: 'Admin',
        phone: '0123456789',
        addr: '225 Nguyễn Văn Cừ, Q.5, TP.HCM',
        admin: true,
        added: new Date(),
        status: true,
    })
];

var done = 0;
for (var i = 0; i < users.length; i++){
    users[i].save(function(err, result){
        done++;
        if (err)
        console.log(err);
        if (done === users.length){
            exit();
        }
    });
    
}
function exit(){
    mongoose.disconnect();
}