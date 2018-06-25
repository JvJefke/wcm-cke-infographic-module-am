(function(angular, CKEDITOR) {
	angular.module("cke-infographic-am_0.0.5.factories")
		.factory("ckeditorInfographicAMPlugin", [
			"$filter",
			"CKEditorInfographicAMConfig",
			"DialogService",

			function ckeditorInfographicAMPlugin(
				$filter,
				CKEditorInfographicAMConfig,
				DialogService
			) {
				var allowedContent = "div section article p a div span;" +
					"div(!wcm-quote,!wcm-infographic__icon-container);" +
					"section(!wcm-infographic__items);" +
					"article(!wcm-infographic__item);" +
					"p(!wcm-infographic__text);" +
					"a[href](!wcm-infographic__action);" +
					"div(!wcm-infographic__action__content);" +
					"span;";
				var itemTemplateContent = "<div class=\"wcm-infographic__icon-container\"><span>1</span></div>" +
					"<p class=\"wcm-infographic__text\"></p>";

				var setDataFromElement = function setDataFromElement(widget) {
					var infographicItems = widget.element.find(".wcm-infographic__item");
					var linkItem = widget.element.findOne(".wcm-infographic__action");

					var itemsData = _.reduce(infographicItems.toArray(), function(acc, el) {
						var contentEl = el.findOne(".wcm-infographic__text");

						if (!contentEl) {
							return acc;
						}

						acc.push({ content: contentEl.getHtml() });

						return acc;
					}, []);

					widget.setData("items", itemsData);

					if (!linkItem) {
						return;
					}

					widget.setData("link", {
						url: linkItem.getAttribute("href"),
						description: linkItem.getHtml(),
						showLink: linkItem.data("showLink") === "true",
					});
				};

				var setElementFromData = function setElementFromData(widget) {
					var itemsData = widget.data.items;
					var linkData = widget.data.link;
					var itemsEl = widget.element.findOne(".wcm-infographic__items");
					var linkEl = widget.element.findOne(".wcm-infographic__action");

					itemsEl.setHtml("");

					_.forEach(itemsData, function(item, index) {
						var itemEl = new CKEDITOR.dom.element("article");

						itemEl.setHtml(itemTemplateContent.replace(/1/g, index + 1));
						itemEl.addClass("wcm-infographic__item");
						itemEl.findOne(".wcm-infographic__text").setHtml(item.content);

						itemsEl.append(itemEl);
					});

					if (_.get(linkData, "showLink", false)) {
						linkEl.show();
					} else {
						linkEl.hide();
					}

					linkEl.data("showLink", _.get(linkData, "showLink", false));
					linkEl.setAttribute("href", _.get(linkData, "url", ""));
					linkEl.setHtml(_.get(linkData, "description", ""));
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
						init: function(editor) {
							editor.widgets.add("infographic", {
								button: "Create a blockquote",
								template:
									"<div class=\"wcm-infographic\">" +
									"<section class=\"wcm-infographic__items\">" +
									"<article class=\"wcm-infographic__item\">" +
									itemTemplateContent +
									"</article>" +
									"</section>" +
									"<a href=\"#\" class=\"wcm-infographic__action\"></a>" +
									"</div>",
								allowedContent: allowedContent,
								requiredContent: "div(wcm-infographic)",
								upcast: function(el) {
									return el.name === "div" && el.hasClass("wcm-infographic");
								},
								downcast: function() {
									setElementFromData(this);
								},
								init: function() {
									var widget = this;

									setDataFromElement(widget);

									widget.on("edit", function() {
										var newData = angular.copy(this.data);

										DialogService.openModal({
											templateUrl: CKEditorInfographicAMConfig.modulePath + "templates/infographic-modal.tpl.html",
											controller: "infographicAMModalController",
											data: newData,
										}).then(function() {
											widget.setData("items", newData.items);
											widget.setData("link", newData.link);

											setElementFromData(widget);

											editor.fire("change");
										});
									});
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
