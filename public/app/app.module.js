(function(angular) {
	angular.module("cke-infographic-am_0.0.6.factories", []);
	angular.module("cke-infographic-am_0.0.6.services", ["cke-infographic-am_0.0.6.factories"]);
	angular.module("cke-infographic-am_0.0.6.controllers", ["cke-infographic-am_0.0.6.services"]);
	angular.module("cke-infographic-am_0.0.6.directives", ["cke-infographic-am_0.0.6.controllers"]);

	angular.module("cke-infographic-am_0.0.6", [

		"pelorus.services",

		"cke-infographic-am_0.0.6.factories",
		"cke-infographic-am_0.0.6.services",
		"cke-infographic-am_0.0.6.controllers",
		"cke-infographic-am_0.0.6.directives",

	])
	.run([function() {
		console.log("CKEditor AM infographic widget is loaded and available! (module)"); // eslint-disable-line no-console
	}]);
})(window.angular);

