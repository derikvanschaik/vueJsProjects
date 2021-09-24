<template>
    <h1>{{topic}}</h1>
    <h4>Remaining: {{subTaskCount}} Completed: {{completedTaskCount}}</h4> 
    <button @click="toggleSubTopics">{{subTopicsVisible? 'Hide': 'Show'}} Sub Tasks</button>
    <button @click="deleteTopic">Delete</button>
    <!-- subtopics  --> 
    <div v-if="subTopicsVisible">
        <add-task 
            taskType="SubTask"
            :errorMessage="error"
            @add-task = "addNewSubTopic"  
            >
        </add-task> 

        <ul>
            <li
                v-for="subTopic in subTopics" 
                :key="subTopic.subTopic"> 
                <sub-task :subTask="subTopic.subTopic"
                          :isComplete="subTopic.isComplete" 
                          @delete-sub-task="deleteSubTopic"
                          @complete-sub-task="completeSubTopic"
                          
                >
                </sub-task> 
            </li>
        </ul>        
    </div>

</template>

<script>
import AddTask from './AddTask.vue';
import SubTask from './SubTask.vue';
export default {
    props:['topic', 'subTaskCount', 'completedTaskCount'], 
    emits: ['modify-sub-topic-counter'], 
        components: { SubTask, AddTask },
        data(){
        return{
            // sub task error message 
            error: '', 
            // sub topics variables 
            subTopicsVisible: false, 
            subTopics: [], 
        }
    }, 
    methods: {
        deleteTopic(){ 
            this.$emit('delete-topic', this.topic);    // emits event to parent component 
        }, 
        toggleSubTopics() {
            this.subTopicsVisible = !this.subTopicsVisible; 
        },
        addNewSubTopic(newSubTopic) {
            if (!newSubTopic.length){
                this.error = "cannot add empty sub task"; 
                return; 
            }
            if (this.subTopics.find( subtopic => subtopic.subTopic === newSubTopic) ){
                this.error = `cannot add already existing ${newSubTopic}`;
                return;  
            }
            
            this.subTopics.push(
                {
                    subTopic: newSubTopic, 
                    isComplete: false, 
                });

            this.newSubTopic = '';
            this.error ="";  
            // increment subTopicCount
            this.$emit('modify-sub-topic-counter', this.topic, 1); 
        }, 
        deleteSubTopic(subTopicToDelete, wasCompleted) {  
            this.subTopics = this.subTopics.filter( obj => obj.subTopic !== subTopicToDelete );
            // don't want to decrement already completed subtasks 
            if (wasCompleted){
                return; 
            }
            // decrement subTopicCount
            this.$emit('modify-sub-topic-counter', this.topic, -1);

        },
        completeSubTopic(subTopicToComplete){
            const completed = this.subTopics.find( obj => obj.subTopic === subTopicToComplete); 
            completed.isComplete = true; // completed 
            // decrement subTopicCount
            this.$emit('modify-sub-topic-counter', this.topic, -1, 1);  
        }
    }
}
</script>