<template>
    <nav ref="nav" v-show="$store.state.showHeader">
        <div class="logo">lcddjm</div>
        <ul class="nav-inner">
            <li :class="active === 'index' ? 'active' : ''"><nuxt-link to="/">blog</nuxt-link></li>
            <li :class="active === 'life' ? 'active' : ''"><a href="//hobby.lcddjm.com">hobby</a></li>
            <!-- <li :class="active === 'intro' ? 'active' : ''"><nuxt-link to="/me">about me</nuxt-link></li> -->
            <li :class="active === 'license' ? 'active' : ''"><nuxt-link to="/license">license</nuxt-link></li>            
        </ul>
        <div class="right">
            <div class="search" @click="triggerSearch">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-search"></use>
                </svg>    
            </div>
            <div class="user" v-if="$store.state.isLogin">
                <span class="avatar" @click="showInfo"><img :src="$store.state.userInfo.avatar" alt="" ></span>
                <User :userInfo="$store.state.userInfo" ref="userInfo"></User>
            </div>
            <div class="nologin" v-else>
                <nuxt-link to="/signup">注册</nuxt-link> |
                <nuxt-link to="/signin">登陆</nuxt-link>                
            </div>
        </div>
        <search :showSearchPage="showSearchPage" v-on:triggerSearch="triggerSearch"></search>
    </nav>
</template>
<script>
    import User from './User';
    import Search from './Search'
    export default {
        name:'Header',
        data(){
            return{
                showSearchPage: false,
            };
        },
        computed:{
            active(){
                return this.$store.state.activeClass
            }
        },
        components:{
            User,
            Search
        },
        mounted(){
        },
        methods:{
            showInfo(e){
                this.$refs.userInfo.$el.style.display = this.$refs.userInfo.$el.style.display === 'block' ? 'none' : 'block';
            },
            triggerSearch(){
                this.showSearchPage = !this.showSearchPage;
            },

        }       
    }
</script>
<style scope lang="scss">
    nav{
        width:100%;
        min-width:940px;
        padding:0 40px;
        box-sizing: border-box;
        height:60px;
        line-height: 60px;
        box-shadow: 0 1px 0 rgba(12,13,14,0.15), 0 0 0 transparent, 0 0 0 transparent, 0 0 0 transparent;
        position: fixed;
        top: 0;
        left: 50%;
        z-index: 1000;
        transform: translateX(-50%);
        background:#33373d;
        color:#fff;
        .logo{
            float:left;
            padding:0 40px 0 0;
            font-size:30px;
            color:#fff;
            position: relative;
            &::after{
                content:'';
                display: block;
                width: 0;
                height: 0;
                height:30px;
                border-right:1px solid #fff;
                position: absolute;
                top: 50%;
                right: 0;
                margin-top:-15px;
            }
        }
        .nav-inner{
            float:left;
            li{
                float:left;
                width:100px;
                text-align:center;
                a:hover{
                    color:#0db4f9;
                }
                &.active a{
                    color:#0db4f9;
                }
            }
            a{
                color:#fff;
            }
        }
        .right{
            float:right;
            >div{
                float:left;
            }
            .search{
                font-size:24px;
                cursor:pointer;
                padding-right:80px;
                position: relative;
                &::after{
                    content:'';
                    display: block;
                    width: 0;
                    height:20px;
                    position: absolute;
                    right:40px;
                    top:20px;
                    border-right:1px solid #ccc;
                }
            }
            .avatar{
                display:block;
                background:#ccc;
                width:40px;
                height:40px;
                margin-top:8px;
                border-radius:50%;
                overflow:hidden;
                cursor:pointer;
            }
            a{
                color:#fff;
            }
        }
        
        .packbtn{
            width:40px;
            height:40px;
            position:absolute;
            right:0;
            top:0;
            text-align:center;
            line-height:40px;
        }
        .packbtn.packup{
            position:fixed;
            left:0;
        }

    }
</style>