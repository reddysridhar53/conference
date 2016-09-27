'use strict';

angular.module('ctrls.joinctrl', [])

.controller('joinCtrl', function($scope,$rootScope, $timeout, $firebase, $location,$window,createUniqueIdService, $routeParams){

	$scope.conferenceId = $routeParams.id;
	$scope.showError = false;
	$scope.showLoader = true;

	$scope.locationTypes = [
		{
			'id' : 1,
			'text' : 'SYDNEY'
		},
		{
			'id' : 2,
			'text' : 'MELBOURNE'
		},
		{
			'id' : 3,
			'text' : 'PERTH'
		}
	]

	$scope.getDetails = function(){

		var fireBase = new Firebase("https://callhub-conference.firebaseio.com/schedules");

		fireBase.on("value", function(snapshot) {
		  
			var schedules = snapshot.val();
			var keys = Object.keys(schedules);

			for(var i=0;i<keys.length;i++){

				if(schedules[keys[i]].id == $scope.conferenceId){

					$scope.setData(schedules[keys[i]])
					return;
				}

			}

		}, function (errorObject) {

		  	console.log("The read failed: " + errorObject.code);
		});
	}

	$scope.setData = function(data){

		$timeout(function(){

			$scope.showLoader = false;
			$scope.conferenceItem = data;
		}, 0)
	}

	$scope.joinConference = function(){

		$scope.showError = false;

		if(!$scope.joinconferenceForm.$valid){

			$scope.showError = true;
			$scope.errorMsg = "Please fill in all details"
			return;
		}

		if($scope.conferenceItem.list.indexOf($scope.email) == -1){

			$scope.showError = true;
			$scope.errorMsg = "You are not invited to this conference, Access denied !!!"
			return;
		}

		var fireBase = new Firebase("https://callhub-conference.firebaseio.com/");

		var people = $firebase(fireBase.child($scope.conferenceId)).$asArray();

		if(typeof $scope.audio == 'undefined'){

			$scope.audio = false;
		}

		if(typeof $scope.video == 'undefined'){

			$scope.video = false;
		}

		var obj = {

			id : $scope.conferenceId,
			name : $scope.name,
			email : $scope.email,
			phone : $scope.phone,
			audio : $scope.audio,
			video : $scope.video,
			location : $scope.location,
			date : Firebase.ServerValue.TIMESTAMP
		}

		people.$add(obj).then(function(data){

			$window.location.href = '#/conference/list'
		}, function(err){
			console.log("Error ", err)
		})
	}
})