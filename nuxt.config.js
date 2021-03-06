const pkg = require('./package')
const axios = require('axios')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const {accessKey,secretKey} = require('./config/index');

const {
    VueLoaderPlugin
} = require('vue-loader')
const QiniuPlugin = require('qn-webpack');
 
// 配置 Plugin
const qiniuPlugin = new QiniuPlugin({
    accessKey,
    secretKey,
    bucket: 'dist',
    path: 'dist'
});



module.exports = {
    mode: 'universal',
    //generate
    generate: {
        routes: function () {
            return axios.get('https://api.lcddjm.com/article/get_all')
            .then((res) => {
                return res.data.data.map((article) => {
                    return '/article/' + article._id
                })
            })      
        }
    },

    /*
     ** Headers of the page
     */
    head: {
        title: pkg.name,
        meta: [{
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: pkg.description
            }
        ],
        link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }],
        script: [
            {innerHTML:`
                var _hmt = _hmt || [];(function() {
                    var hm = document.createElement("script");
                    hm.src = "https://hm.baidu.com/hm.js?cf435e5fb8fd03c784b3f900966b8435";
                    var s = document.getElementsByTagName("script")[0]; 
                    s.parentNode.insertBefore(hm, s);
                })();
            `}
        ],
        __dangerouslyDisableSanitizers: ['script'],
    },

    /*
     ** Customize the progress-bar color
     */
    loading: {
        color: '#0db4f9'
    },
    // loading:false,
    /*
     ** Global CSS
     */
    css: [
        '~assets/css/main.css',
        '@/static/scss/normalize.scss',
        'element-ui/lib/theme-chalk/index.css'
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/element-ui',
        {
            src:'~/plugins/extra',
            ssr:false
        },
        {
            src:'~/plugins/global',
            ssr:false
        },
        {
            src:'~/plugins/cropper',
            ssr:false
        },{
            src:'~/plugins/edit',
            ssr:false
        }
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        '@nuxtjs/axios'
    ],
    /*
     ** Axios module configuration
     */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        baseURL:process.env.NODE_ENV === 'development' ? 'http://localhost:8083' : 'https://api.lcddjm.com',
        credentials: true
    },
    /*
     ** Build configuration
     */
    
    build: {
        /*
         ** You can extend webpack config here
         */
        vendor:['axios','~/plugins/element-ui','~/plugins/extra.js'],
        babel: {
            "presets": ["env", 'vue-app']
        },
        publicPath: 'https://static.lcddjm.com/dist',
        extractCSS:true,
        // extend(config, ctx) {
        //     // Run ESLint on save
        //     if (ctx.isDev && ctx.isClient) {
        //         config.module.rules.push({
        //             enforce: 'pre',
        //             test: /\.(js|vue)$/,
        //             loader: 'eslint-loader',
        //             exclude: /(node_modules)/
        //         })
        //     }
        // },
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ],
        plugins: [
            new VueLoaderPlugin(),
            // qiniuPlugin,
            // new BundleAnalyzerPlugin()
        ]
    }
}
