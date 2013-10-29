
function testController($scope, $http, $sce) {
	
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
					}
					else
					{
						this.name = 'show';
						this.title = 'show invisible files';
					}
				}		
		}
	};
		
	$scope.folder_inside = function(index, path)		
	{	
		folder_inside(index, path, $scope, $http);
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
	/*
	$scope.resize = false;
					
	$scope.resizeDiv = function(e){
		document.onmousemove = function (ev)
		{
			if($scope.resize)
			{
				$scope.$apply(function(){
			      $scope.window.left.width=ev.clientX;
			    });
			}
		}
		
			
	}
	$scope.resizeDivFinish = function(){
		$scope.resize = false
		document.onmousemove = null;
		mousePos($scope);	
	}
	$scope.mousePos = mousePos($scope);			*/	
	
}
/*
function mousePos($scope){
 	document.onmousemove = function (e) {
	 	
	 	if((e.clientX >=($scope.window.left.width) && e.clientX <=($scope.window.left.width+5))) 
 		{	
 			$("body").css('cursor', 'ew-resize');
 			$scope.resize = true;
 		}
 		else
 		{ 
 			$("body").css('cursor', 'default');
 			$scope.resize = false;
 		}
 	};
 	
};

*/
	  
	  
function folder_inside(index, path, $scope, $http)
{
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
