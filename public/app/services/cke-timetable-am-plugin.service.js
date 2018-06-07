(function(angular) {
	angular.module("cke-infographic-am_0.0.1.services")
		.service("ckeditorPluginDefinitionsInfographicAM", [
			"ckeditorInfographicAMPlugin",

			function ckeditorPluginDefinitionsChangelog(
				ckeditorInfographicAMPlugin
			) {
				var plugins = {};

				plugins.Infographic = ckeditorInfographicAMPlugin;

				return plugins;
			},
		]);
})(window.angular);
