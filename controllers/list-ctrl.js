'use strict';

angular.module('ctrls.listctrl', [])

.controller("listCtrl", function($scope,$rootScope, $firebase, $location,$window,createUniqueIdService){

	$scope.schedules = [];
	var schedulesArr = []

	var fireBase = new Firebase("https://callhub-conference.firebaseio.com/schedules");

	$scope.getAllAchedules = function(){

		fireBase.on("value", function(snapshot) {
		  
			var schedules = snapshot.val();
			var keys = Object.keys(schedules);

			for(var i=0;i<keys.length;i++){


				schedulesArr.push(schedules[keys[i]])
			}

			$scope.schedules = schedulesArr;

		}, function (errorObject) {

		  	console.log("The read failed: " + errorObject.code);
		});
	}
})