module.exports = function(Hype) {

    return {
        routes: {
            '/' + Hype.config.adminUrl + '/login': {
                method: 'get',
                callback: function(req, res) {

                }
            },
            '/' + Hype.config.adminUrl + '/logout': {
                method: 'get',
                callback: function(req, res) {

                }
            }
        }
    }
};
