(function(angular) {
	angular.module("cke-infographic-am_0.0.5")
		.config([

			"ckeditorInfographicPluginProvider",
			"ckeditorProvider",

			function(ckeditorInfographicPluginProvider) {
				ckeditorInfographicPluginProvider.controls.registerAll();
			},
		]);
})(window.angular);
