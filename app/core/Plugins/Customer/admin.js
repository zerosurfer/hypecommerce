/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = {
    routes: require('./lib/admin/routes'),
    // @kurt	Include a folder of widgets? Curious how we can tie backbone into something like this
    //			these of course would be the drag-n-drop widgets on the dashboard
    widgets: './lib/admin/widgets'

};
