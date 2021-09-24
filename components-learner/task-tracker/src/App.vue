<template>
    <h1>Task Tracker</h1> 

    <add-task 
        taskType="Task Category"
        :errorMessage="error" 
        @add-task="addTopic">
    </add-task> 

    <hr>
    <task-topic
        v-for="topic in topics"
        :key="topic.id"
        :topic="topic.topicName"
        :subTaskCount="topic.subTaskCount"
        :completedTaskCount = "topic.completedTaskCount" 
        @delete-topic="removeTopic"
        @modify-sub-topic-counter="modifyTaskCount"
    >
    </task-topic>

    <h4 v-if="topics.length === 0">No Topics To Show</h4>

</template>

<script>
import AddTask from './components/AddTask.vue';
import TaskTopic from './components/TaskTopic.vue';
export default {
  components: { TaskTopic, AddTask },
    data() {
        return{
            key: 0,
            error: '', 
            topics: [
            ],

        }
    }, 
    methods: {
        addTopic(newTopic){
            const existingTopic = this.topics.find( topic => topic.topicName === newTopic); 
            if (existingTopic){
                this.error = `Cannot add already existing topic '${newTopic}'.`; 
                return; 
            }
            this.error = ''; 
            this.topics.push( {id: this.key++, topicName: newTopic, subTaskCount: 0, completedTaskCount: 0}); 
            
        }, 
        removeTopic(topicToDelete){  
            this.topics = this.topics.filter( obj => obj.topicName !== topicToDelete ); 
        },
        modifyTaskCount(topicToIncrementCount, subTaskCountVal,completedTaskCountVal ){

            const topic = this.topics.find( obj => obj.topicName === topicToIncrementCount );
            topic.subTaskCount += subTaskCountVal;
            if (completedTaskCountVal){
                topic.completedTaskCount+= completedTaskCountVal; 
            } 
        }
    }
}
</script>
