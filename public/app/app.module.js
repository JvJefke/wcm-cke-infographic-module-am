(function(angular) {
	angular.module("cke-infographic-am_0.0.5.factories", []);
	angular.module("cke-infographic-am_0.0.5.services", ["cke-infographic-am_0.0.5.factories"]);
	angular.module("cke-infographic-am_0.0.5.controllers", ["cke-infographic-am_0.0.5.services"]);
	angular.module("cke-infographic-am_0.0.5.directives", ["cke-infographic-am_0.0.5.controllers"]);

	angular.module("cke-infographic-am_0.0.5", [

		"pelorus.services",

		"cke-infographic-am_0.0.5.factories",
		"cke-infographic-am_0.0.5.services",
		"cke-infographic-am_0.0.5.controllers",
		"cke-infographic-am_0.0.5.directives",

	])
	.run([function() {
		console.log("CKEditor AM infographic widget is loaded and available! (module)"); // eslint-disable-line no-console
	}]);
})(window.angular);

