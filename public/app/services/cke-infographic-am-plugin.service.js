(function(angular) {
	angular.module("cke-infographic-am_0.0.3.services")
		.service("ckeditorPluginDefinitionsInfographicAM", [
			"ckeditorInfographicAMPlugin",

			function ckeditorPluginDefinitionsChangelog(
				ckeditorInfographicAMPlugin
			) {
				var plugins = {};

				plugins.infographic = ckeditorInfographicAMPlugin;

				return plugins;
			},
		]);
})(window.angular);
