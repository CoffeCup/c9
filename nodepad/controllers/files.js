var fs = require('fs');

function get_folder(request, response)
{	

	var folders, files;
	var w_path = request.body.path;
	var w_index = request.body.index;
	
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
				{
					var index = w_index.slice();
					index.push(folders_list.length);
					var id_class = index.join('_');
				   	folders_list.push({name:entry, tr_class:'', path: w_path+"/", index : index, id_class : id_class});
			    }
			    if(stats.isFile())
			    	file_list.push({name : entry});
			    
			});
		folders = folders_list;
		files = file_list;
		response.send({
			folders:folders, files:files
		});
	});
}

exports.get_folder = get_folder;	
exports.test = function(request, response)
{
	console.log('test');
	 response.send({});
}

