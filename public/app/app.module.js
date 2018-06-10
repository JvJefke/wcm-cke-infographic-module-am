(function(angular) {
	angular.module("cke-infographic-am_0.0.3.factories", []);
	angular.module("cke-infographic-am_0.0.3.services", ["cke-infographic-am_0.0.3.factories"]);
	angular.module("cke-infographic-am_0.0.3.controllers", ["cke-infographic-am_0.0.3.services"]);
	angular.module("cke-infographic-am_0.0.3.directives", ["cke-infographic-am_0.0.3.controllers"]);

	angular.module("cke-infographic-am_0.0.3", [

		"pelorus.services",

		"cke-infographic-am_0.0.3.factories",
		"cke-infographic-am_0.0.3.services",
		"cke-infographic-am_0.0.3.controllers",
		"cke-infographic-am_0.0.3.directives",

	])
	.run([function() {
		console.log("CKEditor AM infographic widget is loaded and available! (module)"); // eslint-disable-line no-console
	}]);
})(window.angular);

