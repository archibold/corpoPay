// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'controllers', 'ngCordova', 'services'])

.run(function($ionicPlatform, phoneContactsService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    phoneContactsService.initPhoneContacts();
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router, which uses the concept of states.
  // Learn more here: https://github.com/angular-ui/ui-router.
  // Set up the various states in which the app can be.
  // Each state's controller can be found in controllers.js.
  $stateProvider


  // Set up a state for the templates:
  .state('home', {
    url: '/',
    templateUrl: 'templates/loanview.html',
    controller: 'loanListCtrl',
     cache: false
  })

  .state('phoneList', {
    url: '/phoneList',
    templateUrl: 'templates/phonelist.html',
    controller: 'phoneListCtrl',
     cache: false
  })

  // Each tab has its own nav history stack:

 
  // If none of the above states are matched, use this as the fallback:
  $urlRouterProvider.otherwise('/');

})

// Filter for positive and negative numbers
.filter('customCurrency', ["$filter", function ($filter) {       
    return function(amount, currencySymbol){
        var currency = $filter('currency');         

        if(amount < 0){
            return currency(amount, currencySymbol).replace("(", "-").replace(")", ""); 
        }

        return currency(amount, currencySymbol);
    };
}]);