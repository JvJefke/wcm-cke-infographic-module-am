(function(angular) {
	angular.module("cke-infographic-am_0.0.1")
		.provider("ckeditorInfographicPlugin", [

			"$provide",

			function ckeditorInfographicPluginProvider($provide) {

				var registerAll = function registerAll() {
					$provide.decorator("ckeditorService", [

						"$delegate",
						"ckeditorPluginDefinitionsInfographicAM",

						function(ckeditorService, ckeditorPluginDefinitionsInfographicAM) {
							_.forEach(ckeditorPluginDefinitionsInfographicAM, function(plugin, name) {
								ckeditorService.activatePlugin(name, plugin.plugin, plugin.meta);
							});

							return ckeditorService;
						},
					]);
				};

				this.controls = {
					registerAll: registerAll,
				};

				this.$get = function get() {
					return this.controls;
				};

			},
		]);
})(window.angular);
