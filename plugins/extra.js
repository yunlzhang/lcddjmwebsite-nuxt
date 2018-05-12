import '../static/iconfont/iconfont'
import '../static/js/particles';
/*版权 start*/
import '../static/js/util.js';
import '../static/js/copy.js';
/*  end  */
/* 公共样式  */
import 'quill/dist/quill.snow.css'
import '~/static/css/vs2015.css'
import '~/static/css/animate.css'
/* end  */

/* highlight */
import hljs from '~/static/js/highlight.min';
window.hljs = hljs;
/* end */

import {throttle,returnTop} from '../static/js/common';

document.addEventListener('scroll',throttle(function(){
    if(document.documentElement.scrollTop > window.innerHeight){
        document.querySelector('.return-top').style.display = 'block';
    }else{
        document.querySelector('.return-top').style.display = 'none';
    }
},200,true),false)

document.addEventListener('click',function(e){
    let isClickTarget = false;
    let el = document.querySelectorAll('.return-top,.return-top *');
    for(let i =0,len = el.length;i<len;i++){
        if(el[i] === e.target){
            isClickTarget = true;
            break;
        }
    }
    if(isClickTarget){
        returnTop();
        
    }
},false)