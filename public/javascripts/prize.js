luckApp.controller('lk.prize.prizeController',['$scope','$state','$stateParams','lk.wechartFactory','lk.prize.prizeFactory',
function($scope,$state,$stateParams,wx,fac){
	console.log("prize");
	$scope.prizeSel = {
        options: ['特等奖','一等奖','二等奖','三等奖'],
        selected: '三等奖'
    };
	$scope.prizeStart = function(){
		$('.prize-fireworks').fireworks({ 
		  	sound: true,
		  	opacity: 0.9, 
		  	width: '100%', 
		  	height: '100%' 
		});
	};
}]);

luckApp.factory('lk.prize.prizeFactory', ['$http',function($http){
	return {
		getprize:function(callback){
			$http({
                method: 'POST',
                data:{},
                url: '/prize'
            }).success(function(data, header, config, status) {
                return callback && callback(data);
            });
		}
	};
}]);