(function(angular, CKEDITOR) {
	angular.module("cke-infographic-am_0.0.1.factories")
		.factory("ckeditorInfographicAMPlugin", [
			"$filter",
			"CKEditorInfographicAMConfig",

			function ckeditorInfographicAMPlugin(
				$filter,
				CKEditorInfographicAMConfig
			) {
				var allowedContent = "div(!wcm-quote,!wcm-infographic__icon-container);section(!wcm-infographic__items);article(!wcm-infographic__item);p(!wcm-infographic__text);span";
				var editables = {
					content: {
						selector: ".wcm-infographic__text",
						allowedContent: "br strong em",
					},
				};

				// Strip unallowed tags
				function removeDissalowedContent(html) {
					var filter = new CKEDITOR.filter("div br em strong");
					var fragment = CKEDITOR.htmlParser.fragment.fromHtml(html);
					var writer = new CKEDITOR.htmlParser.basicWriter();

					filter.applyTo(fragment, true, false, CKEDITOR.ENTER_BR);
					fragment.writeHtml(writer);

					return writer.getHtml();
				}

				return {
					meta: {
						toolbar: [{
							name: "insert",
							items: ["infographic"],
						}],
						extraPlugins: "infographic",
					},
					plugin: {
						requires: "widget",
						allowedContent: "div",
						styleableElements: "div",
						inline: true,
						init: function(editor) {
							editor.widgets.add("infographic", {
								button: "Create a blockquote",
								template:
									"<div class=\"wcm-infographic\">" +
										"<section class=\"wcm-infographic__items\">" +
											"<article class=\"wcm-infographic__item\">" +
												"<div class=\"wcm-infographic__icon-container\"><span>1</span></div>" +
												"<p class=\"wcm-infographic__text\"></p>" +
											"</article>" +
										"</section>" +
									"</div>",
								editables: editables,
								allowedContent: allowedContent,
								requiredContent: "div(wcm-infographic)",
								upcast: function(el) {
									return el.name === "div" && el.hasClass("wcm-infographic");
								},
								init: function() {
									// if (this.element.findOne(".wcm-infographic__text")) {
									// 	return;
									// }

									// var refactoredTemplate = "<p class=\"wcm-infographic__text\">" + removeDissalowedContent(this.element.getHtml()) + "</p>";

									// this.element.find(.setHtml(refactoredTemplate);
									// this.element.addClass("wcm-infographic");

                                    // Manully set editables on rendered html
									this.initEditable("content", editables.content);
								},
							});

							editor.ui.addButton("infographic", {
								label: "Add a infographic",
								command: "infographic",
								toolbar: "insert",
								icon: CKEditorInfographicAMConfig.assetsDirPath + "/icons/infographic.png",
								hidpi: true,
							});

							editor.addContentsCss(CKEditorInfographicAMConfig.cssDirPath + "/style.css");
						},
					},
				};
			},
		]);
}) (window.angular, window.CKEDITOR);
