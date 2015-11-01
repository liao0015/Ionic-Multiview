angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller("SettingCtrl", function($scope, LocalStorageService){
    if(LocalStorageService.getStorageList('settingList')){
        $scope.settings = JSON.parse(LocalStorageService.getStorageList('settingList'));
    }
    else{
         $scope.settings =   [
                                    {text:"Vibration", checked:false}, 
                                    {text:"Push Notification", checked:false}
                                ];
    }
    
    //check the toggle-button
    $scope.setToggle = function(index){
        if($scope.settings[index].checked){
            $scope.settings[index].checked = false;
            LocalStorageService.setStorageList('settingList', JSON.stringify($scope.settings));
        }
        else
        {
            $scope.settings[index].checked = true;
            LocalStorageService.setStorageList('settingList', JSON.stringify($scope.settings));
        }
    }
})

.controller("NamesCtrl", function($scope, LocalStorageService, $cordovaVibration, $cordovaLocalNotification){
    //sync $scope with $localStorage
   
    if(LocalStorageService.getStorageList('nameList')){
        $scope.names = JSON.parse(LocalStorageService.getStorageList('nameList'));
    }
    else{
        $scope.names = [];
    }
    
    //check the check-button
    $scope.setChecker = function(index){
        //check if vibration and notification are toggled on
        $scope.settings = JSON.parse(LocalStorageService.getStorageList('settingList'));
        //check if names are checked
        if($scope.names[index].checked){
            $scope.names[index].checked = false;
            LocalStorageService.setStorageList('nameList', JSON.stringify($scope.names));
            $scope.counter --;
        }
        else
        {
            $scope.names[index].checked = true;
            LocalStorageService.setStorageList('nameList', JSON.stringify($scope.names));
            $scope.counter ++;
            // Vibrate 100ms when is checked
            if($scope.settings[0].checked){
                alert("vibration checked");
                //$cordovaVibration.vibrate(100);
            }
        }
        
        //check how many items in the list are checked
        $scope.counter = 0;
        for(var i = 0; i<$scope.names.length; i++){
            if($scope.names[i].checked == true){
                $scope.counter ++;
            }
        }
        if($scope.counter == $scope.names.length){
            alert("full name list");
            //send out a push notification upon a full list 
            if($scope.settings[1].checked){
                alert("notification checked");
                 /*
                $cordovaLocalNotification.schedule({
                    id: 1,
                    title: "Name List Notification",
                    text: "Name list is all checked",
                    data: {
                      customProperty: "custom value"
                    }
                  }).then(function (result) {
                    console.log(result);
                  });
                  */
              }
        }
    };
    
    //add names to the list
    $scope.addName = function(){
        if(($scope.newName != null) && ($scope.newName != "")){
            $scope.names.push({"text": $scope.newName, "checked":false});
            LocalStorageService.setStorageList('nameList', JSON.stringify($scope.names));
            $scope.newName = "";
        }
        else{
            alert("Please enter a name");
        }
    };
    
    //remove names from the list
    $scope.removeName = function(name){
        var i = $scope.names.indexOf(name);
        $scope.names.splice(i, 1);
        LocalStorageService.setStorageList('nameList', JSON.stringify($scope.names));
    };
})

.controller("GiftsCtrl", function($scope, LocalStorageService, $cordovaVibration, $cordovaLocalNotification){
    
    //sync $scope with $localStorage
     if(LocalStorageService.getStorageList('giftList')){
        $scope.gifts = JSON.parse(LocalStorageService.getStorageList('giftList'));
    }
    else{
        $scope.gifts = [];
    }
    
    //check the check-button
    $scope.setChecker = function(index){
        $scope.settings = JSON.parse(LocalStorageService.getStorageList('settingList'));

        if($scope.gifts[index].checked){
            $scope.gifts[index].checked = false;
            LocalStorageService.setStorageList('giftList', JSON.stringify($scope.gifts));
            $scope.counter --;
        }
        else{
            $scope.gifts[index].checked = true;
            LocalStorageService.setStorageList('giftList', JSON.stringify($scope.gifts));
            $scope.counter ++;
            // Vibrate 100ms when is checked
            if($scope.settings[0].checked){
                alert("vibration checked");
                //$cordovaVibration.vibrate(100);
            }
        }
        
        //check how many items in the list are checked
        $scope.counter = 0;
        for(var i = 0; i<$scope.gifts.length; i++){
            if($scope.gifts[i].checked == true){
                $scope.counter ++;
            }
        }
        if($scope.counter == $scope.gifts.length){
            alert("full gift list");
            //send out a push notification upon a full list 
            if($scope.settings[1].checked){
                alert("notification checked");
                /*$cordovaLocalNotification.schedule({
                id: 1,
                title: "Gift List Notification",
                text: "Gift list is all checked",
                data: {
                  customProperty: "custom value"
                }
                }).then(function (result) {
                console.log(result);
                });*/
            }
        }
    };
    
    //add gifts to the list
    $scope.addGift = function(){
        if(($scope.newGift != null) && ($scope.newGift != "")){
            $scope.gifts.push({"text":$scope.newGift, "checked": false});
            LocalStorageService.setStorageList('giftList', JSON.stringify($scope.gifts));
            $scope.newGift = "";
        }
        else{
            alert("Please enter a gift");
        }
    };
    
    //remove gifts from the list
    $scope.removeGift = function(gift){
        var i = $scope.gifts.indexOf(gift);
        $scope.gifts.splice(i, 1);
        LocalStorageService.setStorageList('giftList', JSON.stringify($scope.gifts));
    };
})

.controller("HolidaysCtrl", function($scope, LocalStorageService, $cordovaVibration, $cordovaLocalNotification){
    
    //sync $scope with $localStorage
    if(LocalStorageService.getStorageList('holidayList')){
        $scope.holidays = JSON.parse(LocalStorageService.getStorageList('holidayList'));
    }
    else{
        $scope.holidays = [];
    }
    
    //check the check-button
    $scope.setChecker = function(index){
        $scope.settings = JSON.parse(LocalStorageService.getStorageList('settingList'));

        if($scope.holidays[index].checked){
            $scope.holidays[index].checked = false;
            LocalStorageService.setStorageList('holidayList', JSON.stringify($scope.holidays));
            $scope.counter --;
        }
        else{
            $scope.holidays[index].checked = true;
            LocalStorageService.setStorageList('holidayList', JSON.stringify($scope.holidays));
            $scope.counter ++;
            // Vibrate 100ms when is checked
            if($scope.settings[0].checked){
                alert("vibration checked");
                //$cordovaVibration.vibrate(100);  
            }
        }
        
        //check how many items in the list are checked
        $scope.counter = 0;
        for(var i = 0; i<$scope.holidays.length; i++){
            if($scope.holidays[i].checked == true){
                $scope.counter ++;
            }
        }
        if($scope.counter == $scope.holidays.length){
            alert("full holiday list");
            
            //send out a push notification upon a full list 
            if($scope.settings[1].checked){
                alert("notification checked");
                /*$cordovaLocalNotification.schedule({
                id: 1,
                title: "Holiday List Notification",
                text: "Holiday list is all checked",
                data: {
                  customProperty: "custom value"
                }
                }).then(function (result) {
                console.log(result);
                });*/
            }
        }
    };
    
    //add holidays to the list
    $scope.addHoliday = function(){
        if(($scope.newHoliday != null) && ($scope.newHoliday != "")){
            $scope.holidays.push({"text":$scope.newHoliday, "checked":false});
            LocalStorageService.setStorageList('holidayList', JSON.stringify($scope.holidays));
            $scope.newHoliday = "";
        }
        else{
            alert("Please enter a holiday");
        }
    };
    
    //remove holidays from the list
    $scope.removeHoliday = function(holiday){
        var i = $scope.holidays.indexOf(holiday);
        $scope.holidays.splice(i, 1);
        LocalStorageService.setStorageList('holidayList', JSON.stringify($scope.holidays));
    };
});
