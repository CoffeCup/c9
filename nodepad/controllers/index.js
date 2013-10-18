/*
 * GET home page.
 */

var data_arr = {title: "Express"};
exports.index = function(req, res){
	res.render('index', data_arr);
};

