
function testController($scope, $http, $sce) {
	$scope.show_hidden = true;
	$scope.buttons = {
		hide_files:{
			name:'hide', 
			title:'hide invisible files',
			click : function()
				{
					if(this.name == 'show')
					{
						this.name = 'hide';
						this.title = 'hide invisible files';
						$scope.show_hidden = true;
					}
					else
					{
						this.name = 'show';
						this.title = 'show invisible files';
						$scope.show_hidden = false;
					}
				}		
		}
	};
		
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
		if($scope.show_hidden != true && $scope.selected.name[0] == '.')
			$scope.selected.active = "ng-hide";
		else
			$scope.selected.active = "";
	$scope.selected = obj;
	$scope.selected.active = "blue_marker";
	console.log($scope.selected.name,$scope.selected.active)
}
