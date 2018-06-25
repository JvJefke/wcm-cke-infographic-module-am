(function(angular) {
	angular.module("cke-infographic-am_0.0.4.controllers")
		.controller("infographicAMModalController", [

			"$scope",

			function($scope) {
                $scope.options = [{ label: "Show Link", key: "showLink" }];

				$scope.addFeature = function() {
					$scope.ngDialogData.items.push({
						content: "",
					});
				};

				$scope.removeFeature = function(index) {
					$scope.ngDialogData.items.splice(index, 1);
				};
			},
		]);
})(window.angular);