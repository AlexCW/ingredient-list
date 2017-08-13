exports.command = function(index, value) {
    return this.assert.containsText('.navbar-nav li:nth-child(' + index + ')', value);
};