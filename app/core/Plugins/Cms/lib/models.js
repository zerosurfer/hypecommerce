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

    CmsBlock: {
        schema: {
            name: String,
            description: String,
            content: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
                store: 'Store'
            }
        }
    },

    Page: {
        schema: {
            name: String,
            description: String,
            content: String,
            metaDescription: String,
            metaTags: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
                store: 'Store'
            }
        }
    },

    Slider: {
        schema: {
            name: String,
            code: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasMany: {
                slides: 'Slide'
            }
        }
    },

    Slide: {
        schema: {
            name: String,
            filepath: String,
            content: String,
            order: Number,
            metaDescription: String,
            metaTags: String,
            createdAt: Date,
            updatedAt: Date
        }
    }
};
