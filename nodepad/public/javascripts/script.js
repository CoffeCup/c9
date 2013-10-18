function testController($scope, $http) {
	$scope.classes = "";

	

	  $scope.tr_transf = function($index){
	  	
	  	tr($index, $scope);
	  };


	$http({method: 'post', url: '/init'}).
	    success(function(data, status, headers, config) {
	    	var window = $scope.window = data;
	    // this callback will be called asynchronously
	    // when the response is available
	    }).
	    error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    });
	
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
	$scope.mousePos = mousePos($scope);				
	
}

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

function tr($index, $scope) {console.log($scope.window.files_tree.folders[$index]);
	  	if($scope.window.files_tree.folders[$index].tr_class == "")
	  		$scope.window.files_tree.folders[$index].tr_class = "triangle_transform";
	  	else
	  		$scope.window.files_tree.folders[$index].tr_class = "";
	    //console.log(window.files_tree.folders[$index]);
	  };

