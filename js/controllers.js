var controllers =  angular.module('controllers', ['ionic', 'ngCordova', 'services']);

controllers.controller('phoneListCtrl', function($scope, phoneContactsService, $filter){
  	$scope.contacts = phoneContactsService.getPhoneContacts();
  	var tempList = [];

  	$scope.doIfChecked = function(isChecked, contact) {
  		if(isChecked && !contact.isAdd){
  			tempList.push(contact);
  		}
  	}

  	$scope.addToLoanList = function(){
  		phoneContactsService.addToLoanList(tempList);
  		tempList = [];
  	}
})

controllers.controller('loanListCtrl', function($scope, $ionicPopup, $ionicPlatform, phoneContactsService) {
	$ionicPlatform.ready(function() {
		$scope.loanList = phoneContactsService.getLoanList();
	});
	
	$scope.data = {};
	$scope.showPopup = function(loaner) {
		  // An elaborate, custom popup
		  var myPopup = $ionicPopup.show({
		    templateUrl: 'templates/popup.html',
		    title: loaner.contactName,
		    scope: $scope,
		    buttons: [
		      { text: 'Cancel' },
		      {
		        text: '<b>Save</b>',
		        type: 'button-positive',
		        onTap: function(e) {
		        	loaner.cash += parseInt($scope.data.cash);
		        	phoneContactsService.saveLoanList(loaner.phonenumber, $scope.data.cash);
		        }
		      }
		    ]
		  });
	}
})