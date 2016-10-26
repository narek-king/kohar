angular.module('kohar.photo', [])
    .directive('photoDirective', function($uibModal) {
        return {
            restrict : "E",
            scope : {
                imageSrc : '@'
            },
            template : '<img class="k_image_admin" ng-src="{{src}}" alt="my image">',
            link: function ($scope, element) {
                $scope.src = $scope.imageSrc;
                $scope.animationsEnabled = true;

                angular.element(element).bind('click', function () {
                    var modal;

                    $scope.ok = function () {
                        console.log('ok');
                        modal.close();
                    };

                    modal = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        template: '<div>' +
                                    '<div class="modal-header"><h3 class="modal-title" id="modal-title">I\'m a modal!</h3></div>' +
                                    '<div  class="modal-body k_modal_body"><img class="k_image_modal" ng-src="{{imageSrc}}" alt="My Modal"></div>' +
                                    '<div class="modal-footer">' +
                                        '<button class="btn btn-primary" type="button" data-ng-click="ok()">' +
                                            '<span class="glyphicon glyphicon glyphicon-remove" aria-hidden="true"></span>' +
                                        '</button>' +
                                    '</div>' +
                                  '</div>',
                        size: 'modal-sm',
                        scope: $scope
                    });

                });

            }
        };
    });
