var luckApp = angular.module("luckApp", ["ui.router"]);

luckApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when("", "/tab");
	$stateProvider
        .state("tab", {
            url: "/tab",
            controller:'lk.tab.tabController',
            templateUrl: "../tpls/tab.html"
        })
        .state("tab.wall", {
            url:"/wall",
            params: {data: null},
            templateUrl: "../tpls/wall.html"
        })
        .state("tab.prize", {
            url:"/prize",
            templateUrl: "../tpls/prize.html"
        })
        .state("tab.vote", {
            url:"/vote",
            templateUrl: "../tpls/vote.html"
        });
});

luckApp.controller('lk.init.initController',['$scope','lk.wechartFactory',
function($scope,wx){
	$scope.isLoading = true;
	if (sessionStorage.getItem("openids") === null || sessionStorage.getItem("openids") === "") {
		$scope.isSignHide = true;
	}else{
		$scope.isSignHide = false;
	}

	var scene = {
	     	"action_name": "QR_LIMIT_SCENE",
	     	"action_info": {
	        "scene": {
	            "scene_id": 1001
	        }
	    }
 	};
	if (sessionStorage.getItem("token") === null || sessionStorage.getItem("token") === "") {
		wx.getToken(function(data){
			sessionStorage.setItem("token",data.access_token);
		 	//获取二维码的Ticket,得到二维码链接图片
			wx.getCodeTicket({token:data.access_token,scene:scene},function(data){
				if (data.errcode) {
					wx.getToken(function(data){
						sessionStorage.setItem("token",data.access_token);
						window.location.reload();
					});
				}
				var url = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+data.ticket;
				$scope.$broadcast("code", url);
			});
		});
	}else{
		//获取二维码的Ticket,得到二维码链接图片
		wx.getCodeTicket({token:sessionStorage.getItem("token"),scene:scene},function(data){
			if (data.errcode) {
				wx.getToken(function(data){
					sessionStorage.setItem("token",data.access_token);
					window.location.reload();
				});
			}
			var url = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+data.ticket;
			$scope.$broadcast("code", url);
		});
	}
	$scope.isLoading = false;
	$scope.$on("sign",function(event,isSign){
		$scope.isSignHide = isSign;
	});
	
}]);

luckApp.factory('lk.wechartFactory', ['$http',function($http){
	return {
		getToken:function(callback){
			$http({
                method: 'POST',
                url: '/getToken'
            }).success(function(data, header, config, status) {
            	return callback && callback(data);
            });
		},
		getTicket:function(param,callback){
			$http({
                method: 'POST',
                data:param,
                url: '/getTicket'
            }).success(function(data, header, config, status) {
            	return callback && callback(data);
            });
		},
		getCodeTicket:function(param,callback){
			$http({
                method: 'POST',
                data:param,
                url: '/getCodeTicket'
            }).success(function(data, header, config, status) {
            	return callback && callback(data);
            });
		},
		getAllUserId:function(param,callback){
			$http({
                method: 'POST',
                data:param,
                url: '/getAllUserId'
            }).success(function(data, header, config, status) {
            	return callback && callback(data);
            });
		},
		getUser:function(param,callback){
			$http({
                method: 'POST',
                data:param,
                url: '/getUser'
            }).success(function(data, header, config, status) {
            	return callback && callback(data);
            });
		}
	};
}]);