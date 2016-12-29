luckApp.controller('lk.vote.voteController',['$scope','$state','$stateParams','lk.wechartFactory','lk.vote.voteFactory',
function($scope,$state,$stateParams,wx,fac){
	console.log("vote");
}]);

luckApp.factory('lk.vote.voteFactory', ['$http',function($http){
	return {
		getvote:function(callback){
			$http({
                method: 'POST',
                data:{},
                url: '/vote'
            }).success(function(data, header, config, status) {
                return callback && callback(data);
            });
		}
	};
}]);