/**
 * Application assets config (used in the App and Webpack builder)
 */
var glob = require("glob");


module.exports = {
    build_directory : "build",
    assets_map : {
        vendor: [
            './src/assets/js/vendor/style-vendor.js',
            // 'jquery/dist/jquery.min.js',
            // 'owl.carousel/dist/owl.carousel.min.js',
            // 'swiper/swiper-bundle.min.js',
        ],
        app: [
            // './src/assets/js/app/swiper.min.js',
            './src/assets/js/app/main.js',
            './src/assets/js/app/style-app.js',
            './src/assets/js/app/softtech.js',
            './src/assets/js/app/indexPage.js',
            './src/assets/js/app/mobile.js'
        ],
        html: glob.sync("./src/*.html"),
        images: glob.sync("./src/assets/images/nonoptimised/*.*"),
        // sprites: glob.sync("./src/assets/images/sprite.png"),
        // svg: glob.sync("./src/assets/images/svg/*.*")
    }
};
