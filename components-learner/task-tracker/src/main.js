import { createApp } from 'vue';
import App from './App.vue';
// components 
import TaskTopic from './components/TaskTopic.vue';
import SubTask from './components/SubTask.vue';
import AddTask from './components/AddTask.vue';

const app = createApp(App);

app.component('task-topic', TaskTopic);
app.component('sub-task', SubTask);
app.component('add-task', AddTask); 

app.mount('#app'); 
