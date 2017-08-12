exports.command = function(email, password) {
    return this.setValue('#email', email)
      		   .setValue('#password', password)
      		   .click('.btn-login');
};