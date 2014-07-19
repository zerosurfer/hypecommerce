require('Hype', 'Other', function(Hype, Other) {
	Hype.start();

	var MyPageView = Hype.PageView.extend({

	});

	Hype.registerPage('MyPlugin', ['Dep, Dep2'], {
		view: MyPageView, // Backbone View!! or

		template: ''
	});
});