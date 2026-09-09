import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { focus } from './directives/focus';
import { clickOutside } from './directives/click-outside';
import { copy } from './directives/copy';
import { lifecycle } from './directives/lifecycle';

const app = createApp(App);

app.directive('focus', focus);
app.directive('click-outside', clickOutside);
app.directive('copy', copy);
app.directive('lifecycle', lifecycle);

app.use(router);

app.mount('#app');
