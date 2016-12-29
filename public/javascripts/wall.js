luckApp.controller('lk.wall.wallController',['$scope','$state','$stateParams','lk.wechartFactory','lk.wall.wallFactory',
function($scope,$state,$stateParams,wx,fac){
	if (!$stateParams.data) {
        $state.go('tab');
        return false;
    }
    $scope.$emit("code", sessionStorage.getItem("codeUrl"))

    var openIds = $stateParams.data.data.openid;
    $scope.users = [];
    openIds.forEach(function(openid){
    	wx.getUser({
			token:sessionStorage.getItem("token"),
			openid:openid
		},function(data){
			$scope.users.push(data);
    	});
    });


    /*var ws = new WebSocket('ws://localhost:8001');
	ws.onopen = function(e){
		ws.onmessage = function(e){
    		console.log(e.data);
    		$scope.users.push(e.data);
    	}
    	$scope.imgClick = function(){
    		ws.send({nickname:'HHDD',headimgurl:''});
    	}
	}*/
    















}]);

luckApp.factory('lk.wall.wallFactory', ['$http',function($http){
	return {
		getWall:function(callback){
			$http({
                method: 'POST',
                data:{},
                url: '/wall'
            }).success(function(data, header, config, status) {
                return callback && callback(data);
            });
		}
	};
}]);