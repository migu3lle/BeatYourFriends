
module.exports = function(app) {
 
    const users = require('../controller/controller.js');
 
    // Retrieve all User
    app.get('/api/users', users.findAll);
 
    // Retrieve a single User by E-Mail
    app.get('/api/users/:userMail', users.findById);
 
    // Update a User with Id
    app.put('/api/users', users.update);
 
    // Delete a User with Id
    app.delete('/api/users/:userId', users.delete);
}