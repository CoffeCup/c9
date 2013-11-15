
function WindowsController($scope) {
	$scope.resize = false;
	$scope.left = {width:parseInt(localStorage['left_width']) || 200, height:200};				
	$scope.resizeDiv = function(e){
		document.onmousemove = function (ev)
		{
			if($scope.resize)
			{
				$scope.$apply(function(){
			      $scope.left.width=ev.clientX;
			      localStorage['left_width'] = parseInt(ev.clientX);
			    });
			}
		}
		
			
	}
	$scope.resizeDivFinish = function(){
		$scope.resize = false;
		document.onmousemove = null;
		mousePos($scope);	
	}
	$scope.mousePos = mousePos($scope);				
	
}



	  
	  

function mousePos($scope){
	 	document.onmousemove = function (e) {
		 	
		 	if((e.clientX >=($scope.left.width) && e.clientX <=($scope.left.width+5))) 
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