'use strict';

angular.module('ctrls.listctrl', [])

.controller("listCtrl", function($scope,$rootScope, $timeout, $firebase, $location,$window,createUniqueIdService){

	$scope.schedules = [];
	var schedulesArr = []
	$scope.showLoader = true;

	var fireBase = new Firebase("https://callhub-conference.firebaseio.com/schedules");

	$scope.getAllAchedules = function(){

		fireBase.on("value", function(snapshot) {
		  
			var schedules = snapshot.val();
			var keys = Object.keys(schedules);

			for(var i=0;i<keys.length;i++){


				schedulesArr.push(schedules[keys[i]])
			}
			$timeout(function(){
				$scope.showLoader = false;
				$scope.schedules = schedulesArr;
			}, 0)

		}, function (errorObject) {

		  	console.log("The read failed: " + errorObject.code);
		});
	}
})