(function(angular, CKEDITOR) {
	angular.module("cke-infographic-am_0.0.2.factories")
		.factory("ckeditorInfographicAMPlugin", [
			"$filter",
			"CKEditorInfographicAMConfig",

			function ckeditorInfographicAMPlugin(
				$filter,
				CKEditorInfographicAMConfig
			) {
				var allowedContent = "div(!wcm-quote,!wcm-infographic__icon-container);" +
					"section(!wcm-infographic__items);" +
					"article(!wcm-infographic__item);" +
					"p(!wcm-infographic__text);" +
					"span;" +
					"button(!wcm-infographic-action)";
				var editables = {
					content: {
						selector: ".wcm-infographic__text--1",
						allowedContent: "br strong em",
					},
					action: {
						selector: ".wcm-infographic-action",
						allowedContent: "br strong em",
					},
				};
				var itemTemplateContent = "<div class=\"wcm-infographic__icon-container wcm-infographic__icon-container--1\"><span>1</span></div>" +
					"<p class=\"wcm-infographic__text wcm-infographic__text--1\"></p>";

				var removeItem = function removeItem(widget, el) {
					el.remove();
					generateEditables(widget);
				};

				var generateEditables = function generateEditables(widget) {
					widget.initEditable("action", editables.action);

					_.forEach(widget.element.find(".wcm-infographic__item").toArray(), function(el, index) {
						var newPosition = index + 1;

						addButtonToElement(el, "wcm-temp-remove-button", function() {
							removeItem(widget, el);
						});

						el.$.className = "wcm-infographic__item wcm-infographic__item--" + newPosition;
						el.findOne(".wcm-infographic__icon-container>span").setHtml(newPosition);
						el.findOne(".wcm-infographic__text").$.className = "wcm-infographic__text wcm-infographic__text--" + newPosition;

						widget.initEditable("content-" + newPosition, Object.assign(
							{},
							editables.content,
							{ selector: editables.content.selector.replace(/1/g, newPosition) }
						));
					});
				};

				var addButtonToElement = function addButtonToElement(el, className, cb) {
					if (!el || el.findOne("." + className)) {
						return;
					}

					var button = new CKEDITOR.dom.element("button");

					button.addClass(className);
					button.on("click", cb);

					el.append(button);
				};

				var addItem = function addItem(widget) {
					var itemsEl = widget.element.findOne(".wcm-infographic__items");

					if (!itemsEl) {
						return;
					}

					var newEl = new CKEDITOR.dom.element("article");
					var newPosition = itemsEl.find(".wcm-infographic__item").count() + 1;

					newEl.setHtml(itemTemplateContent.replace(/1/g, newPosition));
					newEl.addClass("wcm-infographic__item");
					newEl.addClass("wcm-infographic__item--" + newPosition);

					itemsEl.append(newEl);

					generateEditables(widget);
				};

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
						inline: true,
						init: function(editor) {
							editor.widgets.add("infographic", {
								button: "Create a blockquote",
								template:
									"<div class=\"wcm-infographic\">" +
									"<section class=\"wcm-infographic__items\">" +
									"<article class=\"wcm-infographic__item wcm-infographic__item--1\">" +
									itemTemplateContent +
									"</article>" +
									"</section>" +
									"<button class=\"wcm-infographic-action\">Lees het verslag</button>" +
									"</div>",
								// editables: editables,
								allowedContent: allowedContent,
								requiredContent: "div(wcm-infographic)",
								parts: {
									content: ".wcm-infographic__item",
								},
								upcast: function(el) {
									return el.name === "div" && el.hasClass("wcm-infographic");
								},
								init: function() {
									var widget = this;

									addButtonToElement(widget.element, "wcm-temp-add-button", function() {
										addItem(widget);
									});
									generateEditables(widget);
								},
							});

							if (editor.contextMenu) {
								editor.addCommand("addInfographicItem", {
									exec: function() {
										var selection = editor.getSelection();
										var element = selection.getStartElement();
										var widget = editor.widgets.getByElement(element);

										addItem(widget);
									},
								});
								editor.addMenuGroup("infographicGroup");
								editor.addMenuItem("addInfographicItem", {
									label: "Add infographic item",
									// icon: this.path + 'icons/abbr.png',
									command: "addInfographicItem",
									group: "infographicGroup",
								});

								editor.contextMenu.addListener(function(element) {
									if (!element.hasClass("cke_widget_wrapper_wcm-infographic")) {
										return;
									}

									return { addInfographicItem: CKEDITOR.TRISTATE_OFF };
								});
							}


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
})(window.angular, window.CKEDITOR);
