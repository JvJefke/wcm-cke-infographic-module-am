(function(angular) {
	angular.module("cke-infographic-am_0.0.2.factories", []);
	angular.module("cke-infographic-am_0.0.2.services", ["cke-infographic-am_0.0.2.factories"]);
	angular.module("cke-infographic-am_0.0.2.controllers", ["cke-infographic-am_0.0.2.services"]);
	angular.module("cke-infographic-am_0.0.2.directives", ["cke-infographic-am_0.0.2.controllers"]);

	angular.module("cke-infographic-am_0.0.2", [

		"pelorus.services",

		"cke-infographic-am_0.0.2.factories",
		"cke-infographic-am_0.0.2.services",
		"cke-infographic-am_0.0.2.controllers",
		"cke-infographic-am_0.0.2.directives",

	])
	.run([function() {
		console.log("CKEditor AM infographic widget is loaded and available! (module)"); // eslint-disable-line no-console
	}]);
})(window.angular);

