angular.module('orders', []).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/list', {templateUrl: 'partials/ListOrders.html', controller: OrderListController}).
            otherwise({redirectTo: '/phones'});
    }]);