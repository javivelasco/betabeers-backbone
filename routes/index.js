
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Meet Backbone.js | Betabeers workshop' });
};
