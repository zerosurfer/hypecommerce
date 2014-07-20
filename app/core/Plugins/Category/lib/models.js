/**
 * Hype Commerce
 *
 * @package		Hype
 * @module		Category
 * @version		0.0.1.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = {

    Category: {
        schema: {
            name: String,
            description: String,
            metaDescription: String,
            metaTags: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
            	parent: 'Category',
                store: 'Store',
                cover: 'CmsBlock'
            },
            hasMany: {
                products: 'Product'
            }
        }
    }
};
