function OrderListController($scope, $http) {
    $http({method: 'GET', url: 'services/orders/list.json'})
        .success(function (data) {
            $scope.orders = data;
        });
}