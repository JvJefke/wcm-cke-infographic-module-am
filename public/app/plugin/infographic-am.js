(function(angular, CKEDITOR) {
	angular.module("cke-infographic-am_0.0.2.factories")
		.factory("ckeditorInfographicAMPlugin", [
			"$filter",
			"CKEditorInfographicAMConfig",

			function ckeditorInfographicAMPlugin(
				$filter,
				CKEditorInfographicAMConfig
			) {
				var allowedContent = "div section article p a div span;" +
					"div(!wcm-quote,!wcm-infographic__icon-container);" +
					"section(!wcm-infographic__items);" +
					"article(!wcm-infographic__item);" +
					"p(!wcm-infographic__text);" +
					"a[href](!wcm-infographic__action);" +
					"div(!wcm-infographic__action__content);" +
					"span;";
				var editables = {
					content: {
						selector: ".wcm-infographic__text--1",
						allowedContent: "br strong em",
					},
					action: {
						selector: ".wcm-infographic__action__content",
						allowedContent: "br strong em",
					},
				};
				var itemTemplateContent = "<div class=\"wcm-infographic__icon-container wcm-infographic__icon-container--1\"><span>1</span></div>" +
					"<p class=\"wcm-infographic__text wcm-infographic__text--1\"></p>";

				var addButtonToElement = function addButtonToElement(el, className, beforeClass, cb) {
					console.log("adding button to element");
					if (!el || el.findOne("." + className)) {
						return;
					}

					var button = new CKEDITOR.dom.element("button");

					button.addClass(className);
					button.on("click", cb);
					button.setState(CKEDITOR.TRISTATE_DISABLED);

					var beforeEl = el.findOne("." + beforeClass);

					if (beforeClass && beforeEl) {
						return button.insertBefore(beforeEl);
					}

					el.append(button);
				};

				var generateEditables = function generateEditables(widget) {
					widget.initEditable("action", editables.action);

					_.forEach(widget.element.find(".wcm-infographic__item").toArray(), function(el, index) {
						var newPosition = index + 1;

						addButtonToElement(el, "wcm-temp-remove-button", null, function() {
							removeItem(widget, el);
						});

						el.$.className = "wcm-infographic__item wcm-infographic__item--" + newPosition;
						el.findOne(".wcm-infographic__icon-container>span").setHtml(newPosition);
						el.findOne(".wcm-infographic__text").$.className = "wcm-infographic__text wcm-infographic__text--" + newPosition;

						widget.initEditable("content-" + newPosition, Object.assign({}, editables.content, {
							selector: editables.content.selector.replace(/1/g, newPosition),
						}));
					});
				};

				var addItem = function addItem(widget) {
					var itemsEl = widget.element.findOne(".wcm-infographic__items");
					var addNewButton = itemsEl.findOne(".wcm-temp-add-button");

					if (!itemsEl) {
						return;
					}

					var newEl = new CKEDITOR.dom.element("article");
					var newPosition = itemsEl.find(".wcm-infographic__item").count() + 1;

					newEl.setHtml(itemTemplateContent.replace(/1/g, newPosition));
					newEl.addClass("wcm-infographic__item");
					newEl.addClass("wcm-infographic__item--" + newPosition);

					newEl.insertBefore(addNewButton);

					generateEditables(widget);
				};

				var removeItem = function removeItem(widget, el) {
					el.remove();
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
							CKEDITOR.dialog.add("infographic", function() {
								return {
									title: "Edit action link",
									minWidth: 300,
									minHeight: 100,
									contents: [{
										id: "Link",
										elements: [{
											id: "link",
											type: "text",
											label: "Link",
											width: "200px",
											setup: function(widget) {
												this.setValue(widget.data.link);
											},
											commit: function(widget) {
												widget.setData("link", this.getValue());
												widget.element.findOne(".wcm-infographic__action__content").setAttribute("href", this.getValue());
											},
										}],
									}],
								};
							});

							editor.addCommand("addInfographicItem", {
								exec: function() {
									var selection = editor.getSelection();
									var element = selection.getStartElement();
									var widget = editor.widgets.getByElement(element);

									addItem(widget);
								},
							});

							if (editor.contextMenu) {
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

							editor.widgets.add("infographic", {
								button: "Create a blockquote",
								template:
									"<div class=\"wcm-infographic\">" +
									"<section class=\"wcm-infographic__items\">" +
									"<article class=\"wcm-infographic__item wcm-infographic__item--1\">" +
									itemTemplateContent +
									"</article>" +
									"</section>" +
									"<a href=\"#\" class=\"wcm-infographic__action\">" +
									"<div class=\"wcm-infographic__action__content\">Lees het verslag</div>" +
									"</a>" +
									"</div>",
								// editables: editables,
								allowedContent: allowedContent,
								requiredContent: "div(wcm-infographic)",
								parts: {
									content: ".wcm-infographic__item",
								},
								dialog: "infographic",
								upcast: function(el) {
									return el.name === "div" && el.hasClass("wcm-infographic");
								},
								init: function() {
									var widget = this;
									var linkItem = widget.element.findOne(".wcm-infographic__action__content");

									widget.setData("link", linkItem.getAttribute("href"));

									addButtonToElement(
										widget.element.findOne(".wcm-infographic__items"),
										"wcm-temp-add-button",
										null,
										addItem.bind(null, widget)
									);

									generateEditables(widget);
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
})(window.angular, window.CKEDITOR);
