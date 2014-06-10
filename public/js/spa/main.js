define(["spa/App"], function(App){

    /*
     * allows for templates to be called in a cleaner fashion without the need for loading through require or a global templates object
     * example:
     * var NewView = Marionette.ItemView.extend({
     *     template: 'some/path/to/template' - real path would be templates/some/path/to/template.html
     * });
     */
    Marionette.TemplateCache.prototype.loadTemplate = function(templateId) {
        var template = '';

        $.ajax({
            type: 'GET',
            async: false,
            url: 'templates/' + templateId + '.html'
        })
        .done(function(html) {
            template = html;
        });

        return template;
    };

	var app = new App();

	app.addRegions({
		"mainRegion": "#application"
	});

	app.addInitializer(function(){
		this.init();
	});

	app.start();

	return app;
});