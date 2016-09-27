'use strict';

angular.module('ctrls.roomctrl', [])

.controller("roomCtrl", function($scope, $timeout, $rootScope, $firebase, $location,$window,createUniqueIdService, $routeParams){

	$scope.participents = [];
	var participentsArr = []
	$scope.chat = {};
	$scope.chat.chatActive = false;
	$scope.chatActive = false;
	$scope.pariticipent = {};

	$scope.chat.activeVideo = true;
	$scope.messages = [];
	$scope.chat.activeAudio = true;
	$scope.count = 1;

	$scope.noParticipants = function(){

		if($scope.participents != null && $scope.participents.length > 0){

			return true
		}else{

			return false;
		}
	}

	var fireBase = new Firebase("https://callhub-conference.firebaseio.com/"+$routeParams.id);

	$scope.getAllParticipants = function(){

		fireBase.on("value", function(snapshot) {
		  
			var participents = snapshot.val();
			var keys = Object.keys(participents);

			for(var i=0;i<keys.length;i++){

				participents[keys[i]].key = keys[i];
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

	$scope.closeChat = function(){

		$scope.chat.chatActive = false;
	}

	$scope.openChat = function(){

		if($scope.chatActive){

			$scope.chat.chatActive = false;
		}else{

			$scope.chat.chatActive = true;
		}
	}

	$scope.muteAction = function(e,type){

		if(type == "audio" || type == "video"){

			if($(e.currentTarget).hasClass("false")){

				$(e.currentTarget).removeClass("false").addClass("true")
			}else{

				$(e.currentTarget).addClass("false").removeClass("true")
			}
		}

		if(type == "close"){

			var key = $(".card-key").attr("data-key")
			var firebase = new Firebase("https://callhub-conference.firebaseio.com/"+$routeParams.id+"/"+key)
			firebase.remove();
			$timeout(function(){

				$window.location.reload();
			}, 1000)
		}
	}

	$scope.getActiveVideo = function(){

		if($scope.chat.activeVideo){

			return 'active';
		}else{

			return '';
		}
	}

	$scope.getActiveAudio = function(){

		if($scope.chat.activeAudio){

			return 'active';
		}else{

			return '';
		}
	}

	$scope.$watch('chat.activeVideo', function(oldValue, newValue){

		$scope.getActiveVideo()
	})
	$scope.$watch('chat.activeAudio', function(oldValue, newValue){

		$scope.getActiveAudio()
	})

	$scope.muteAll = function(e,type){

		if(type == "audio"){

			if($scope.chat.activeAudio){

				$scope.chat.activeAudio = false;
			}else{

				$scope.chat.activeAudio = true;
			}
			
		}else if(type == "video"){

			if($scope.chat.activeVideo){

				$scope.chat.activeVideo = false;
			}else{

				$scope.chat.activeVideo = true;
			}
			
		}else{


		}
	}

	$scope.exitConf = function(){

		$window.location.href = "#/conference/list"
	}


	$scope.chatSubmit = function(event){

		if($scope.chat.message){

			if(event.which == 13){

				var obj = {

					image:'http://res.cloudinary.com/http-yourdost-com/image/upload/v1440092146/team/amitt.png',
					name:'sample',
					id : $scope.count
				}

				$scope.count++;
				obj.text = $scope.chat.message;
				obj.date = new Date();

				$scope.messages.push(obj)
				$scope.chat.message = "";
			}
		}
	}

})