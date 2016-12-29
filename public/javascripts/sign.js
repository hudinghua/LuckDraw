luckApp.controller('lk.sign.signController',['$scope','$state','lk.wechartFactory','lk.sign.signFactory',
function($scope,$state,wx,fac){
	
	$scope.signIn = function(){
		if (($scope.user === "admin" && $scope.password === "1234")) {
			wx.getAllUserId({
				token:sessionStorage.getItem("token"),
				next_openid:""
			},function(data){
				sessionStorage.setItem("openids",JSON.stringify(data));
				$state.go('tab.wall',{data:data},{reload : true});
			});
			$scope.$emit("sign", false);
			//window.location.href = location.protocol +'//'+ location.host +'/#/tab';
		}
	};




}]);

luckApp.factory('lk.sign.signFactory', ['$http',function($http){
	return {
		getsign:function(callback){
			$http({
                method: 'POST',
                data:{},
                url: '/sign'
            }).success(function(data, header, config, status) {
                return callback && callback(data);
            });
		}
	};
}]);