<template>
    <div class="main">
        <div id="particles-js"></div>
        <div v-if="!loading" class="showbox loading">
            <div class="loader">
                <svg class="circular" viewBox="25 25 50 50">
                    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
                </svg>
            </div>
        </div>
        <div v-else class="main-wrap" ref="main">
            <ul class="article-lists" v-if="article.length">
                <li class="article-item" v-for="item in article" v-bind:key="item._id">
                    <router-link :to="'/article/'+item._id">
                        <div class="title" v-if="item.title">
                            <span>{{item.title}}</span>
                        </div>
                        <!--<div class="cover" v-if="item.cover"><img :src="item.cover" alt=""></div>-->
                        <div class="des">{{item.des}}</div>
                        <ul class="create">
                            <li>发表于 {{item.created_at}}</li>
                            <li v-if="item.tags.length">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-cc-tag-more"></use>
                                </svg> {{item.tags.toString()}}</li>
                            <li v-if="item.comments_count">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-iconfontpinglun"></use>
                                </svg> {{item.comments_count}}</li>
                            <li v-if="item.pv">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-fangwenliang"></use>
                                </svg> {{item.pv}}</li>
                        </ul>
                    </router-link>
                </li>
            </ul>
            <el-pagination background layout="prev, pager, next" :page-size="5" :total="articleLength" @current-change="pageChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        async asyncData({
            app
        }) {
            let res = await app.$axios({
                method: 'get',
                params: {
                    page: 1,
                    num: 5
                },
                url: (process.env.NODE_ENV === 'development' ? 'http://localhost:8083' :
                    'https://api.lcddjm.com') + '/article/get_index_data'
            })
            if (res.data.code == 200) {
                return {
                    articleLength: res.data.article_length,
                    article: res.data.article_data,
                }
            } else {
                return {}
            }
        },
        head() {
            return {
                title: 'lcddjm\'s website',
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: ' vue2 + nuxt +  axios + element-ui + express + mongodb + pm2  |  个人网站的nuxt版本·'
                    }
                ]
            }
        },
        data() {
            return {
                article: [],
                articleLength: 0,
                loading: true
            }
        },
        mounted: function () {
            document.title = 'lcddjm\'s website';
        },
        methods: {
            getIndexData(data) {
                this.$axios({
                    method: 'get',
                    params: data,
                    url: this.HOST + '/article/get_index_data'
                }).then(res => {
                    if (res.data.code == 200) {
                        this.articleLength = res.data.article_length;
                        this.article = res.data.article_data;
                        this.loading = true;
                    } else {
                        this.$message({
                            message: res.data.message,
                            type: 'warning'
                        });
                    }
                })
            },
            getArticle(data) {
                this.$axios({
                    method: 'get',
                    params: data,
                    url: this.HOST + '/article/get_article'
                }).then(res => {
                    if (res.data.code == 200) {
                        this.article = res.data.data;
                    } else {
                        this.$message({
                            message: res.data.message,
                            type: 'warning'
                        });
                    }
                })
            },
            pageChange(page) {
                this.article = [];
                this.getArticle({
                    page: page,
                    num: 5
                });
            },
            particle() {
                
            }
            
        }

    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .main {
        // padding-left:300px;
        overflow: hidden;
        transition: padding 1s linear;
    }

    #particles-js {
        position: fixed;
        width: 100%;
        height: 100%;
    }

    .main-wrap {
        max-width: 800px;
        width: 100%;
        position: relative;
        padding-top: 60px;
        margin: 0 auto;
        .article-lists {
            text-align: left; // margin:20px 0;
        }
        .article-item {
            padding: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin: 20px 0;
            &:hover {
                box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.1);
            }
            .title {
                font-weight: 700;
                font-size: 24px;
                line-height: 1.75;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 100%;
                span {
                    float: left;
                    position: relative;
                    &::after {
                        content: " ";
                        position: absolute;
                        width: 100%;
                        height: .1em;
                        bottom: 5px;
                        left: 0;
                        background: #26272b;
                        transform: scaleX(0);
                        transition: .3s ease-in-out;

                    }
                    &:hover {
                        &::after {
                            transform: scaleX(1);
                        }
                    }
                }
            }
            .cover {
                margin: 10px 0;
            }
            .des {
                word-wrap: break-word;
                word-break: break-all;
            }
            .create {
                margin: 10px 0 0;
                color: #ababab;
                overflow: hidden;
                li {
                    float: left;
                    margin-right: 20px;
                }
            }
        }
    }
</style>
<style>
    .el-pagination {
        margin: 40px 0;
        text-align: center;
    }

    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .el-pager li {
        margin: 0 10px;
        min-width: 40px;
    }

    .el-pager li {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
    }

    .el-pagination button,
    .el-pagination span:not([class*=suffix]) {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
    }

    .el-pagination .btn-next .el-icon,
    .el-pagination .btn-prev .el-icon {
        font-size: 16px;
    }

    .el-pagination.is-background .el-pager li.active {
        background: #0db4f9 !important;
    }

</style>
