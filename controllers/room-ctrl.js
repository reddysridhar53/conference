'use strict';

angular.module('ctrls.roomctrl', [])

.controller("roomCtrl", function($scope,$rootScope, $firebase, $location,$window,createUniqueIdService, $routeParams){

	$scope.participents = [];
	var participentsArr = []
	$scope.chat = {};
	$scope.chat.chatActive = false;
	$scope.chatActive = false;

	var fireBase = new Firebase("https://callhub-conference.firebaseio.com/"+$routeParams.id);

	$scope.getAllParticipants = function(){

		fireBase.on("value", function(snapshot) {
		  
			var participents = snapshot.val();
			var keys = Object.keys(participents);

			for(var i=0;i<keys.length;i++){


				participentsArr.push(participents[keys[i]])
			}

			$scope.participents = participentsArr;

		}, function (errorObject) {

		  	console.log("The read failed: " + errorObject.code);
		});
	}

	$scope.$watch('chat.chatActive', function(newValue, oldValue){

		$scope.chatActive = newValue
	})

	$scope.getActiveState = function(){

		if($scope.chatActive){

			return 'active';
		}
		return '';
	}

	$scope.openChat = function(){

		if($scope.chatActive){

			$scope.chat.chatActive = false;
		}else{

			$scope.chat.chatActive = true;
		}
	}
})