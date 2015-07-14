var services = angular.module('services', ['ngCordova', 'ionic']);

services.factory('phoneContactsService', function($cordovaContacts, $filter, $http){
	var phoneContacts =[];

	return{
		initPhoneContacts: function(){
			if(phoneContacts.length == 0){
				//init loanerList
				var local = window.localStorage["microPayment"] =="" 
					|| window.localStorage["microPayment"] == undefined ? []: JSON.parse(window.localStorage["microPayment"]);
				console.log(local);
				$http.get('http://178.62.30.166:3010/getAllLoaner/<telephonenumber>').
				  success(function(data, status, headers, config) {
				    phoneContacts = phoneContacts.concat(data);
				    console.log(data);
					//init phoneContacts
		            $cordovaContacts.find({filter: ''}).then(function(result) {
				    	var contacts = result.sort(function(a, b) {
					        return (a != null && a.displayName != null && a.displayName != undefined &&
					          	b != null && b.displayName != null && b.displayName != undefined )
					        	? a.displayName.localeCompare(b.displayName) : 0;
					    });
					    for (var i = 0; i < contacts.length; i++) {
					        if(contacts[i] != null && contacts[i].displayName != null && 
					        	contacts[i].displayName != undefined && 
					          	contacts[i].phoneNumbers != null ){
					            	var phonenumber = contacts[i].phoneNumbers[0].value.replace('+48', '').replace(/ /g,'').replace('+', '');
					            	var contactName = (contacts[i].displayName != "")? 
					                	contacts[i].displayName : 
					                	contacts[i].phoneNumbers[0].value;

					                var g = $filter('filter')(phoneContacts, {phonenumber: phonenumber}, true)[0];
					                if(g == undefined){
					                	phoneContacts.push({phonenumber:phonenumber, contactName: contactName, isAdd: false});
					                } else{
					                	g.contactName = contactName;
					                	g.isAdd = true;
					                }				            	
					        	}
					    }
					    inited = true;
				    }, function(error) {
				        console.log("ERROR: " + error);
				    });
				  })
				
			}
		},
		getPhoneContacts: function() {
			return phoneContacts;
		},
		addToLoanList: function(contacts){
			for(var i = 0; i<contacts.length; i++){
	  			contacts[i].isAdd = true;
	  			contacts[i].cash = 0;
	  		}
		},
		getLoanList: function(){
			return $filter('filter')(phoneContacts, {isAdd: true}, true)
		},
		saveLoanList: function(loaner, cash){
			$http.post('http://178.62.30.166:3010/saveLoaner/<telephonenumber>', {loaner:loaner, cash: cash}).
			  success(function(data, status, headers, config) {
			    //its ok my friend
			  }).
			  error(function(data, status, headers, config) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
			window.localStorage.setItem("microPayment", JSON.stringify(phoneContacts));
		}
	}
})