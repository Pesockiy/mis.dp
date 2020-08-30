/**
 * Application assets config (used in the App and Webpack builder)
 */
var glob = require("glob");


module.exports = {
    build_directory : "build",
    assets_map : {
        vendor: [
            './src/assets/js/vendor/style-vendor.js',
            'slick-carousel/slick/slick.min.js',
        ],
        app: [
            './src/assets/js/app/style-app.js',
            './src/assets/js/app/indexPage.js',
        ],
        html: glob.sync("./src/*.html"),
        images: glob.sync("./src/assets/images/nonoptimised/*.*"),
        // sprites: glob.sync("./src/assets/images/sprite.png"),
        // svg: glob.sync("./src/assets/images/svg/*.*")
    }
};
