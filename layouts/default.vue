<template>
    <div>
        <Head/>
        <nuxt/>
        <my-footer/>
    </div>
</template>

<script>
    import MyFooter from '../components/Footer.vue'
    import Head from '~/components/Header'
    export default {
        components: {
            MyFooter,
            Head
        },
        watch:{
            $route:{
                handler(to,from,next){
                    this.dealHeader(to.name)
                }
            }
        },
		mounted(){
            this.dealHeader(this.$route.name)            
			this.$store.dispatch('login');
        },
        methods:{
            dealHeader(name){
                // if(~['index','license','signin','signup'].indexOf(name)){
                //     this.$store.commit('changeHeader',true);     
                // }else{
                //     this.$store.commit('changeHeader',false);
                // }
                switch(name){
                    case 'index' :
                    case 'license' :
                        this.$store.commit('changeActiveClass',name)
                    break;
                    default :
                        this.$store.commit('changeActiveClass','')
                }
            }
        }
    }
</script>

<style lang="scss">


</style>
