module.exports = {
    /**
     * Media
     *
     * @var String name
     * @var String url
     * @var String filepath
     * @var Number height
     * @var Number width
     * @var String filetype
     * @var String extension
     * @var String filename
     * @var String altTag
     * @var String altDescription
     * @var Date createdAt
     * @var Date updatedAt
     * @var Mediatype type
     */
    Media: {
        schema: {
            name: String,
            url: String,
            filepath: String,
            height: Number,
            width: Number,
            filetype: String,
            extension: String,
            filename: String,
            altTag: String,
            altDescription: String,
            createdAt: Date,
            updatedAt: Date
        }
    }
};
