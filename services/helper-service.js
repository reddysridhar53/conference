'use strict';

angular.module('service.helpers', [])

.service('createUniqueIdService', function(){

	this.createId = function(){

       return Math.random().toString(36).substr(2, 9);;
	};

	this.checkForEmailError = function(emails){

		var flag = 0;

		$.each(emails, function(index,email){

			var pattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

			if( !pattern.test(email) ){

				flag = 1;
				return false;
			}
		})

		if(flag == 1){

			return false;
		}else{

			return true;
		}
	}

})