/**
 * Hype Commerce
 *
 * @package		Hype
 * @module		Cms
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = {

    /**
     * CmsBlock
     *
     * @var String name; The name of the CmsBlock
     * @var String code; The unique identifing code
     * @var String description; A short and sweet description for your admin users
     * @var String content; A combination of text and HTML content
     * @var Boolean enabled; A disabled CmsBlock will not render
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
     * @var String title; The <head> title of the Page 
     * @var String code; The unique identifing code
     * @var String content; A combination of text and HTML
     * @var String metaDescription: The meta description of the Page
     * @var Array metaKeywords: The meta tags of the Page
     * @var Boolean published; Unpublished pages will not render or return 404 when called
     * @var Store store; The store association (if any, can cross all stores)
     * @var String ogImage; The image to load when sharing with Facebook (optional)
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
            ogImage: String,
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
     * Slider
     *
     * @var String name; Name of the Slider
     * @var String code; The unique identifing code
     * @var Slide slides; The collection of Slide documents
     * @var Date createdAt
     * @var Date updatedAt
     */
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

    /**
     * Slide
     *
     * @var String name; Name of the Slider
     * @var String content; A combination of text and HTML content
     * @var Number position; Position of the Slide in the Slider
     * @var String metaDescription: The meta description of the Slide
     * @var Array metaKeywords: The meta tags of the Slide
     * @var Media image; The media file associated with the Slide (if any)
     * @var Date createdAt
     * @var Date updatedAt
     */
    Slide: {
        schema: {
            name: String,
            content: String,
            position: Number,
            metaDescription: String,
            metaKeywords: [String],
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
                image: 'Media'
            }
        }
    }
};
