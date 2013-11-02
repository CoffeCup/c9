var exec = require("child_process").exec;
var fs = require('fs');


function get_w_path()
{
	var w_index = process.argv.indexOf('-w');
	var w_path = " ";
	if(w_index != -1 && process.argv.length-1 > w_index)
		return process.argv[w_index+1];
	else 
	{
		return "./";
		
	}
}


function get_folders(request, response)
{	
	//request.session.left = {width:200, height:200};
	//request.session.save();
	//console.log(request.session.id);
	var w_path = get_w_path();
	var folders, files, path;
	/*exec("pwd", function (error, stdout, stderr) {
    	path = stdout;
    });*/
	fs.readdir(w_path, function(err, files)
	{	
		var folders_list = new Array();
		var file_list = new Array();
		var nodes = new Array();
		if(typeof(files) != 'undefined')
			files.forEach(function(entry) 
			{
				var stats = fs.statSync(w_path+'/'+entry);	
				if(stats.isDirectory())
				   	folders_list.push({name:entry, tr_class:'', path: w_path, index : [folders_list.length], id_class:folders_list.length});
			    if(stats.isFile())
			    	file_list.push({name : entry});
			    
			});
		folders = folders_list;
		files = file_list;
		nodes[0] = {folders: folders};
		response.send({folders:folders , files:files});
	});
}

exports.index = get_folders;	
exports.test = function(request, response)
{
	console.log('test');
	 response.send({});
}

