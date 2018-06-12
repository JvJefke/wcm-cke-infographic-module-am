(function(angular) {
	angular.module("cke-infographic-am_0.0.4.factories", []);
	angular.module("cke-infographic-am_0.0.4.services", ["cke-infographic-am_0.0.4.factories"]);
	angular.module("cke-infographic-am_0.0.4.controllers", ["cke-infographic-am_0.0.4.services"]);
	angular.module("cke-infographic-am_0.0.4.directives", ["cke-infographic-am_0.0.4.controllers"]);

	angular.module("cke-infographic-am_0.0.4", [

		"pelorus.services",

		"cke-infographic-am_0.0.4.factories",
		"cke-infographic-am_0.0.4.services",
		"cke-infographic-am_0.0.4.controllers",
		"cke-infographic-am_0.0.4.directives",

	])
	.run([function() {
		console.log("CKEditor AM infographic widget is loaded and available! (module)"); // eslint-disable-line no-console
	}]);
})(window.angular);

