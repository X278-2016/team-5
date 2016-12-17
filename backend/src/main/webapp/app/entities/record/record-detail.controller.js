(function() {
    'use strict';

    angular
        .module('backendApp')
        .controller('RecordDetailController', RecordDetailController);

    RecordDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Record'];

    function RecordDetailController($scope, $rootScope, $stateParams, previousState, entity, Record) {
        var vm = this;

        vm.record = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('backendApp:recordUpdate', function(event, result) {
            vm.record = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
