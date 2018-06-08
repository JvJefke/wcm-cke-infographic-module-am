(function(angular) {
	angular.module("cke-infographic-am_0.0.2")
		.config([

			"ckeditorInfographicPluginProvider",
			"ckeditorProvider",

			function(ckeditorInfographicPluginProvider) {
				ckeditorInfographicPluginProvider.controls.registerAll();
			},
		]);
})(window.angular);
