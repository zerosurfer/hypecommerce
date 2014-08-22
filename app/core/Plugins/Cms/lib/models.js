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

    /**
     * CMS Block
     *
     * @var String name; The name of the static block
     * @var String code; The unique identifing code
     * @var String description; A short and sweet description for your admin users
     * @var String content; A combination of text and HTML content
     * @var Boolean enabled; A disabled block will not render
     * @var Store store; The store association (if any, can cross all stores)
     * @var Date createdAt
     * @var Date updatedAt
     */
    CmsBlock: {
        schema: {
            name: String,
            description: String,
            content: String,
            enabled: Boolean,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
                store: 'Store'
            }
        }
    },

    /**
     * Page
     *
     * @var String title; The <head> title of the page 
     * @var String code; The unique identifing code
     * @var String content; A combination of text and HTML
     * @var String metaDescription: The meta description of the page
     * @var Array metaKeywords: The meta tags of the page
     * @var Boolean published; Unpublished pages will not render or return 404 when called
     * @var Store store; The store association (if any, can cross all stores)
     * @var Media ogImage; The image to load when sharing with Facebook (optional)
     * @var Date createdAt
     * @var Date updatedAt
     */
    Page: {
        schema: {
            title: String,
            code: String,
            content: String,
            metaDescription: String,
            metaKeywords: [String],
            published: Boolean,
            publishedAt: Date,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
                ogImage: 'Media', // for facebook og:image tag
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
