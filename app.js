var app = angular.module('CallHubConference', ['ngRoute', 'firebase', 'ui.bootstrap', 
  'moment-picker', 'ctrls.createctrl', 'ctrls.listctrl', 'service.helpers', 'ctrls.joinctrl',
  'ctrls.roomctrl']);

'use strict';

app.config(['$routeProvider', function($routeProvider, $urlRouterProvider){

	$routeProvider

	.when('/conference/create', {

    	templateUrl: 'templates/create.html',
    	controller: 'createCtrl',
    	private : true
  })
  .when('/conference/list', {

      templateUrl: 'templates/list.html',
      controller: 'listCtrl',
      private : true
  })
  .when('/conference/room/:id', {

      templateUrl: 'templates/room.html',
      controller: 'roomCtrl',
      private : true
  })
  .when('/conference/join/:id', {

      templateUrl: 'templates/join.html',
      controller: 'joinCtrl',
      private : true
  })
    
  .otherwise({

      redirectTo: '/conference/create'
  });
}]);

app.config(['momentPickerProvider', function (momentPickerProvider) {

    momentPickerProvider.options({

        locale:        'en',
        format:        'L LTS',
        minView:       'decade',
        maxView:       'minute',
        startView:     'year',
        autoclose:     true,
        today:         false,
        keyboard:      false,
        
        leftArrow:     '&larr;',
        rightArrow:    '&rarr;',
        yearsFormat:   'YYYY',
        monthsFormat:  'MMM',
        daysFormat:    'D',
        hoursFormat:   'HH:[00]',
        minutesFormat: moment.localeData().longDateFormat('LT').replace(/[aA]/, ''),
        secondsFormat: 'ss',
        minutesStep:   30,
        secondsStep:   1
    });
}]);

app.filter('sortByDates', function(){

  return function(items){

    console.log(items)
    for(var i=0;i<items.length;i++){

      a = items[i];
      b = items[i+1];

      items.sort(function(a,b){

        var c = new Date(a.schedule);
        var d = new Date(b.schedule);
        return c-d;
      })
    }
    return items;
  }
})
app.controller('rootCtrl', function($scope, $rootScope,$location){

  $scope.navClass = function (page) {
        
    var currentRoute = $location.path().substring(1);
    return page === currentRoute ? 'active' : '';
  };   
})