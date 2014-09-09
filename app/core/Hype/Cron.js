/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		1.0.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

var schedule = require('node-schedule'),
	Cron;

module.exports = function(Hype) {

	Cron = function() {
		this.crons = [];
		this.modules = {};

		this.add = function(expression, module, task) {
			Hype.debug('Adding cron ' + module.name + '::' + task + ' (' + expression + ')');

			// Load each module's cron once
			if (!this.modules[module.name]) {
				this.modules[module.name] = module.cron;
			}

			// Add the cron
			this.crons.push({
				expr: expression,
				module: module.name,
				task: task
			});
		},

		this.remove = function(module, task) {

		};

		this.start = function() {
			var i = 0,
				job = null,
				module = null;

			for (i; i < this.crons.length; i++) {
				job = this.crons[i];
				module = this.modules[job.module];
				schedule.scheduleJob(job.expr, function() {
					// Execute the job
					Hype.log("Executing cron " + job.module + "::" + job.task);
					module[job.task].action();
				});
			}
		};

		return this;
	}

	return new Cron();
}