<template>
  	<footer>
        <div class="icp">&copy;京ICP备18002267号-1</div>
        <div class="return-top"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-fanhuidingbu1"></use></svg></div>    
  	</footer>
</template>
<style lang="scss">
.icp{
  text-align: center;
  line-height: 40px;
  width: 100%;
  font-size:14px;
 
}
/* 返回顶部 */
    .return-top{
        position: fixed;
        display: none;
        width: 40px;
        height: 40px;
        right:40px;
        bottom:40px;
        border-radius: 50%;
        border:1px solid #ccc;
        cursor: pointer;
        background:rgba(255,255,255,.8);
        font-size:30px;
        text-align: center;
        line-height: 40px;
        &:hover{
           background:rgba(204,204,204,.8); 
        }
    }
    @keyframes rotate2 {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }

    @keyframes color {
        100%,
        0% {
            stroke: #d62d20;
        }
        40% {
            stroke: #0057e7;
        }
        66% {
            stroke: #008744;
        }
        80%,
        90% {
            stroke: #ffa700;
        }
    }
</style>
