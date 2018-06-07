(function(angular) {
	angular.module("cke-infographic-am_0.0.1.factories", []);
	angular.module("cke-infographic-am_0.0.1.services", ["cke-infographic-am_0.0.1.factories"]);
	angular.module("cke-infographic-am_0.0.1.controllers", ["cke-infographic-am_0.0.1.services"]);
	angular.module("cke-infographic-am_0.0.1.directives", ["cke-infographic-am_0.0.1.controllers"]);

	angular.module("cke-infographic-am_0.0.1", [

		"pelorus.services",

		"cke-infographic-am_0.0.1.factories",
		"cke-infographic-am_0.0.1.services",
		"cke-infographic-am_0.0.1.controllers",
		"cke-infographic-am_0.0.1.directives",

	])
	.run([function() {
		console.log("CKEditor AM infographic widget is loaded and available! (module)"); // eslint-disable-line no-console
	}]);
})(window.angular);

