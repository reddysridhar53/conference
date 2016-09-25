'use strict';

angular.module('ctrls.createctrl', [])

.controller("createCtrl", function($scope,$rootScope, $firebase, $location,$window,createUniqueIdService){


	$scope.conferenceTypes = [
		{
			'id' : 1,
			'text' : 'AUDIO'
		},
		{
			'id' : 2,
			'text' : 'VIDEO'
		},
		{
			'id' : 3,
			'text' : 'F2F'
		}
	]

	$scope.isOpen = false;

    $scope.openCalendar = function(e) {

        e.preventDefault();
        e.stopPropagation();

        $scope.isOpen = true;
    };

	var fireBase = new Firebase("https://callhub-conference.firebaseio.com/");
	
	$scope.createSchedule = function(){

		$scope.showError = false;

		if(!$scope.createScheduleForm.$valid){

			$scope.showError = true;
			$scope.errorMsg = "Please fill in all details"
			return;
		}

		var error = createUniqueIdService.checkForEmailError($scope.participents)

		if(!error){

			$scope.showError = true;
			$scope.errorMsg = "Please enter a valid Email";
			return;
		}

		var id = createUniqueIdService.createId()

		var obj = {
			
			id:id,
			schedule : $scope.scheduleDate,
			list : $scope.participents,
			agenda : $scope.conferenceAgenda,
			type : $scope.conferenceType,
			date : Firebase.ServerValue.TIMESTAMP
		}

		var schedules = $firebase(fireBase.child("schedules")).$asArray();

		schedules.$add(obj).then(function(data){

			$scope.showError = false;
			$window.location.href = "#/conference/list";
		}, function(err){

			$scope.showError = true;
			$scope.errorMsg = "Something went wrong. Please try again later"
		})
	}
})