(function(angular) {
	angular.module("cke-infographic-am_0.0.3.controllers")
		.controller("infographicAMModalController", [

			"$scope",

			function($scope) {
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
