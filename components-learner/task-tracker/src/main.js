import { createApp } from 'vue';
import App from './App.vue';
import TaskTopic from './components/TaskTopic.vue'; 

const app = createApp(App);

app.component('task-topic', TaskTopic); 

app.mount('#app'); 
