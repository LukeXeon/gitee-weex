/* weex initialized here, please do not move this line */
const { router } = require('./router');
const App = require('@/about.vue');
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router}, App));
//router.push('/boot');