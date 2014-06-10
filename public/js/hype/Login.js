define([

	],
	function(templates){
		var Login = Backbone.Marionette.ItemView.extend({
			initialize: function(){
				this.app = this.options.app;
			},
			template: 'login',
			events:{
				"click button.btn.login": "login"
			},
			ui: {
				username: "input.username",
				password: "input.password",
				message: "div.message"
			},
			onShow: function(){
				this.ui.username.focus();
			},
			login: function(e){
				var that = this;
				e.preventDefault();
				this.app.login(
					this.ui.username.val(),
					this.ui.password.val(),
					function(err){
						that.ui.message.html(err);
					},
					function(){
						that.ui.message.html("YUPI you are logged in!");
					});
			}
		});
		return Login;
	});