luckApp.controller('lk.tab.tabController',['$scope','$state','lk.wechartFactory','lk.tab.tabFactory',
function($scope,$state,wx,fac){
	
	$scope.goWall = function(){
		if (sessionStorage.getItem("openids") === null || sessionStorage.getItem("openids") === "") {
			return false;
		}
		//$state.go("tab.wall");
		wx.getAllUserId({
			token:sessionStorage.getItem("token"),
			next_openid:""
		},function(data){
			console.log(data);
			$state.go('tab.wall',{data:data},{reload : true});
		});
	};
	$scope.goPrize = function(){
		if (sessionStorage.getItem("openids") === null || sessionStorage.getItem("openids") === "") {
			return false;
		}
		$state.go("tab.prize");
		console.log(222);
	};
	$scope.goVote = function(){
		if (sessionStorage.getItem("openids") === null || sessionStorage.getItem("openids") === "") {
			return false;
		}
		$state.go("tab.vote");
		console.log(3333);
	};
	$scope.goOut = function(){
		wx.getToken(function(data){
			sessionStorage.setItem("token",data.access_token);
		});
		sessionStorage.setItem("openids","");
		$state.go("tab");
		$scope.$emit("sign", true);
	};

	$scope.$on('code', function(event,url){
		$scope.code = url;
		sessionStorage.setItem("codeUrl",url);
	});

}]);

luckApp.factory('lk.tab.tabFactory', ['$http',function($http){
	return {
		gettab:function(callback){
			$http({
                method: 'POST',
                data:{},
                url: '/tab'
            }).success(function(data, header, config, status) {
                return callback && callback(data);
            });
		}
	};
}]);