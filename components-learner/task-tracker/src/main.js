import { createApp } from 'vue';
import App from './App.vue';
// components 
import TaskTopic from './components/TaskTopic.vue';
import SubTask from './components/SubTask.vue';

const app = createApp(App);

app.component('task-topic', TaskTopic);
app.component('sub-task', SubTask); 

app.mount('#app'); 
