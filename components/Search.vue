<template>
    <transition enter-active-class="animated rollIn" leave-active-class="animated rollOut">
        <div class="search-wrap" v-show="showSearchPage">
            <div class="close" @click="triggerSearch">&times;</div>
            <div class="search-result">
                <div class="search-area">
                    <input type="text" v-model="searchKey" placeholder="请输入搜索内容">
                    <div class="search-icon">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-search"></use>
                        </svg>
                    </div>
                </div>
                <ul v-if="searchData.length">
                    <li v-for="item in searchData" :key="item._id">
                        <router-link :to="'/article/'+item._id">
                            <div class="title" v-if="item.title">
                                <span>{{item.title}}</span>
                            </div>
                            <div>
                                <span>发表于 {{item.created_at}}</span>
                                <span v-if="item.tags.length">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-cc-tag-more"></use>
                                    </svg> {{item.tags.toString()}}</span>
                            </div>
                        </router-link>
                    </li>
                </ul>
                <div class="vacant" v-if="vacant">
                    没有查询到数据
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import {
        debounce
    } from '../static/js/common';
    let _this;
    export default {
        name:'Search',
        data(){
            return{
                searchData: '',
                searchKey: '',
                vacant: false
            };
        },
        props:['showSearchPage'],
        watch: {
            searchKey: {
                handler: debounce(function () {
                    _this.getSearchData(_this.searchKey);
                }, 500, false)
            },
            '$route'(to,from){
                if(this.showSearchPage){
                    this.searchData = [];
                    this.searchKey = '';
                    this.vacant = false;
                    this.$emit('triggerSearch');       
                }
            }
            
        },
        mounted(){
            _this = this;
        },
        methods:{
            triggerSearch() {
                this.$emit('triggerSearch')
            },
            getSearchData(key, page = 0, num = 5) {
                this.vacant = false;
                this.$axios({
                    method: 'get',
                    params: {
                        key,
                        page,
                        num
                    },
                    url:'/search'
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.searchData = res.data.data;
                        if (!res.data.data.length) {
                            this.vacant = true;
                        }
                    }
                })
            }  
        }
          
    }
</script>
<style scope lang="scss">
    .search-wrap {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .7);
        z-index: 2000;
        .close {
            width: 80px;
            height: 80px;
            line-height: 80px;
            text-align: center;
            font-size: 40px;
            color: #fff;
            position: absolute;
            right: 0;
            top: 0;
            cursor: pointer;
        }
        .search-result {
            width: 800px;
            position: relative;
            border-radius: 10px;
            margin: 5vh auto;
            height: 90vh;
            overflow: hidden;
            background: #fff;
            padding: 20px 40px;
            box-sizing: border-box;
        }
        .search-area {
            overflow: hidden;
            input {
                float: left;
                width: 640px;
                height: 50px;
                line-height: 50px;
                padding-left: 25px;
                font-size: 18px;
                border-radius: 50px 0 0 50px;
                border: 1px solid #ccc;
                border-right: none;
            }
            .search-icon {
                float: left;
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-size: 20px;
                border-radius: 0 50px 50px 0;
                border: 1px solid #ccc;
                border-left: none;
            }

        }
        ul {
            position: absolute;
            top: 92px;
            bottom: 20px;
            left: 40px;
            right: 40px;
            overflow: scroll;
            li {
                line-height: 1.5;
                padding: 20px 0;
                border-bottom: 1px dashed #ccc;
            }

        }
        .vacant {
            line-height: 200px;
            text-align: center;
            font-size: 40px;
        }

    }
</style>