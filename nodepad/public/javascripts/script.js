var app = angular.module('myApp', []);
     
// Service definition
app.service('testService', function(){
	this.files = [];
});

function testController($scope, $http, $sce, testService) {
//*********************** files are *********************************
	//on file click open new tab with file content
	$scope.edit_file = function(file)		
	{	
		if(!in_array(file, testService.files))
			testService.files.push(file);
	};

//********************** buttons area *******************************
	$scope.show_hidden = (typeof(localStorage['button_hide_files']) != 'undefined') ? localStorage['button_hide_files'] :  'true';
	$scope.buttons = {
		hide_files:{
			name: (localStorage['button_hide_files']!='true') ? 'show' : 'hide', 
			title:'hide invisible files',
			click : function()
				{	
					if($scope.show_hidden != 'true')
					{
						this.name = 'hide';
						this.title = 'hide invisible files';
						$scope.show_hidden = 'true';
						localStorage['button_hide_files'] = 'true';
					}
					else
					{
						this.name = 'show';
						this.title = 'show invisible files';
						$scope.show_hidden = 'false';
						localStorage['button_hide_files'] = 'false';
					}
				}		
		}
	};
		
//************************** hendkers area **************************
	$scope.folder_inside = function(data)		
	{	
		folder_inside(data, $scope, $http);
	};
	/// this function mark blue clicked file or folder IT"S A COURSOR for a file				
	$scope.mark_blue = function(obj)		
	{	
		blue_marker(obj, $scope);
	};
	
	
	$http({method: 'post', url: '/init'}).
	    success(function(data, status, headers, config) {
	    	$scope.files_tree = data;
	    // this callback will be called asynchronously
	    // when the response is available
	    }).
	    error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    });
		
	
}
	  
	  
function folder_inside(data, $scope, $http)
{
	blue_marker(data, $scope);
	var path = data.path+data.name;
	var index = data.index;
	var folder = $scope.files_tree;
	index.forEach(function(entry) 
	{
		folder = folder["folders"][entry];
		
	});
  	if(folder.tr_class == "")
  	{
  		folder.tr_class = "triangle_transform";
  		$('.'+folder.id_class).toggle();
  		if(typeof(folder.folders)=='undefined')
  		{
	  		var data = {index : index, path:path};
		    $http.post('/files/get_folder', data).success(
		    	function(data){
		    		if(data.folders.length > 0)
		    			folder.folders = data.folders;
		    		if(data.files.length > 0)
		    			folder.files = data.files;
		    		
		    	}
		    );
		 }
  	}
  	else
  	{
		folder.tr_class = "";
		$('.'+folder.id_class).toggle();
	}
	
}

function blue_marker(obj, $scope)
{
	if(typeof($scope.selected) != 'undefined')
		// for no conflict marker an hide button
		if($scope.show_hidden != 'true' && $scope.selected.name[0] == '.')
			$scope.selected.active = "ng-hide";
		else
			$scope.selected.active = "";
	$scope.selected = obj;
	$scope.selected.active = "blue_marker";
}

// does we have same object in array now
function in_array(value, array) 
{
    for(var i = 0; i < array.length; i++) 
    {
        if(JSON.stringify(array[i]) === JSON.stringify(value)) return true;
    }
    return false;
}
