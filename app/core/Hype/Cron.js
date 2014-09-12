/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

var crontab = require('node-crontab'),
	_ = require('underscore'),
	Cron;

module.exports = function(Hype) {

	Cron = function() {
		var self = this;
		this.crons = [];
		this.modules = {};
		this.jobs = {};

		this.add = function(expression, module, task) {
			var rule = null;

			Hype.debug('Adding cron ' + module.name + '::' + task + ' (' + expression + ')');

			// Load each module's cron once
			if (!this.modules[module.name]) {
				this.modules[module.name] = module.cron;
			}


			if (typeof expression === 'object') {
				rule = new crontab.RecurrenceRule();
				_(expression).each(function(v, k) {
					rule[k] = v;
				});
			} else {
				rule = expression;
			}

			// Push the cron
			if (!this.jobs[module.name]) {
				this.jobs[module.name] = {};
			}
			if (!this.jobs[module.name][task]) {
				
				this.jobs[module.name][task] = crontab.scheduleJob(rule, function() {
				
					// Execute the job
					Hype.log("Executing cron " + module.name + "::" + task);
					self.modules[module.name][task].action();
				});
			}
		},

		this.remove = function(module, task) {

		};

		this.start = function() {
			return true;
		};

		return this;
	}

	return new Cron();
}