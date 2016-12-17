(function() {
    'use strict';

    angular
        .module('testProjectApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('record', {
            parent: 'entity',
            url: '/record',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Records'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/record/records.html',
                    controller: 'RecordController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('record-detail', {
            parent: 'entity',
            url: '/record/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Record'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/record/record-detail.html',
                    controller: 'RecordDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Record', function($stateParams, Record) {
                    return Record.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'record',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('record-detail.edit', {
            parent: 'record-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/record/record-dialog.html',
                    controller: 'RecordDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Record', function(Record) {
                            return Record.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('record.new', {
            parent: 'record',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/record/record-dialog.html',
                    controller: 'RecordDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                user: null,
                                glucoseLevel: null,
                                mood: null,
                                dateTime: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('record', null, { reload: 'record' });
                }, function() {
                    $state.go('record');
                });
            }]
        })
        .state('record.edit', {
            parent: 'record',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/record/record-dialog.html',
                    controller: 'RecordDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Record', function(Record) {
                            return Record.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('record', null, { reload: 'record' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('record.delete', {
            parent: 'record',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/record/record-delete-dialog.html',
                    controller: 'RecordDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Record', function(Record) {
                            return Record.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('record', null, { reload: 'record' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
