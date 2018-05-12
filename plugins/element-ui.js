import Vue from 'vue'

import {
    Pagination,
    Dialog,
    Upload,
    Carousel,
    CarouselItem,
    Message,
    Select,
    Option,
    MessageBox,
    DatePicker,
    Input
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(DatePicker)
Vue.use(Input)

Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt

export default () => {}