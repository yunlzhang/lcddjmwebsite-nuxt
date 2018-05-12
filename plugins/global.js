
import Vue from 'vue'
Vue.prototype.HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:8083' : 'https://api.lcddjm.com'