(function(angular) {
	angular.module("cke-infographic-am_0.0.7.factories", []);
	angular.module("cke-infographic-am_0.0.7.services", ["cke-infographic-am_0.0.7.factories"]);
	angular.module("cke-infographic-am_0.0.7.controllers", ["cke-infographic-am_0.0.7.services"]);
	angular.module("cke-infographic-am_0.0.7.directives", ["cke-infographic-am_0.0.7.controllers"]);

	angular.module("cke-infographic-am_0.0.7", [

		"pelorus.services",

		"cke-infographic-am_0.0.7.factories",
		"cke-infographic-am_0.0.7.services",
		"cke-infographic-am_0.0.7.controllers",
		"cke-infographic-am_0.0.7.directives",

	])
	.run([function() {
		console.log("CKEditor AM infographic widget is loaded and available! (module)"); // eslint-disable-line no-console
	}]);
})(window.angular);

