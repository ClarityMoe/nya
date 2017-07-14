var app = angular.module('awauApp', ['ngMaterial', 'ngMdIcons']);

app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', function ($scope, $mdBottomSheet, $mdSidenav, $mdDialog) {
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };
    $scope.alert = '';
    $scope.showListBottomSheet = function ($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
            template: '<md-bottom-sheet class="md-list md-has-header"> <md-subheader>Settings</md-subheader> <md-list> <md-item ng-repeat="item in items"><md-item-content md-ink-ripple flex class="inset"> <a flex aria-label="{{item.name}}" ng-click="listItemClick($index)"> <span class="md-inline-list-icon-label">{{ item.name }}</span> </a></md-item-content> </md-item> </md-list></md-bottom-sheet>',
            controller: 'ListBottomSheetCtrl',
            targetEvent: $event
        }).then(function (clickedItem) {
            $scope.alert = clickedItem.name + ' clicked!';
        });
    };

    $scope.showAdd = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
            targetEvent: ev,
        })
            .then(function (answer) {
                $scope.alert = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.alert = 'You cancelled the dialog.';
            });
    };
}]);

app.controller('ListBottomSheetCtrl', function ($scope, $mdBottomSheet) {
    $scope.items = [
        { name: 'Share', icon: 'share' },
        { name: 'Upload', icon: 'upload' },
        { name: 'Copy', icon: 'copy' },
        { name: 'Print this page', icon: 'print' },
    ];

    $scope.listItemClick = function ($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
    };
});

function DialogController($scope, $mdDialog) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
}

app.config(function ($mdThemingProvider) {

    $mdThemingProvider.definePalette('awauDark', {
        '50': 'e8e8e8',
        '100': 'c6c6c6',
        '200': 'a1a1a1',
        '300': '7b7b7b',
        '400': '5e5e5e',
        '500': '424242',
        '600': '3c3c3c',
        '700': '333333',
        '800': '2b2b2b',
        '900': '1d1d1d',
        'A100': 'f07878',
        'A200': 'eb4a4a',
        'A400': 'ff0303',
        'A700': 'e90000',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': [
            '50',
            '100',
            '200',
            'A100'
        ],
        'contrastLightColors': [
            '300',
            '400',
            '500',
            '600',
            '700',
            '800',
            '900',
            'A200',
            'A400',
            'A700'
        ]
    });

    $mdThemingProvider.definePalette('awauBlue', {
        '50': 'e1f3fc',
        '100': 'b3e1f7',
        '200': '81cdf2',
        '300': '4fb9ed',
        '400': '29aae9',
        '500': '039be5',
        '600': '0393e2',
        '700': '0289de',
        '800': '027fda',
        '900': '016dd3',
        'A100': '3776b5',
        'A200': 'c8e1ff',
        'A400': '95c5ff',
        'A700': '7bb8ff',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': [
          '50',
          '100',
          '200',
          '300',
          '400',
          'A100',
          'A200',
          'A400',
          'A700'
        ],
        'contrastLightColors': [
          '500',
          '600',
          '700',
          '800',
          '900'
        ]
      });

    $mdThemingProvider.theme('default')
        .primaryPalette('awauBlue')
        .accentPalette('cyan');
});
