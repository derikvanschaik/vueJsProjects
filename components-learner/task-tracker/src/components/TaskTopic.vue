<template>
    <h1>{{topic}}</h1> 
    <button @click="toggleSubTopics">{{subTopicsVisible? 'Hide': 'Show'}} Sub Tasks</button>
    <button @click="deleteTopic">Delete</button>
    <!-- subtopics  --> 
    <div v-if="subTopicsVisible"> 
        <input v-model="newSubTopic" placeholder="Add new SubTask">
        <button @click="addNewSubTopic">Add New Subtask</button> 
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
import SubTask from './SubTask.vue';
export default {
    props:['topic'], 
        components: { SubTask },
        data(){
        return{
            newSubTopic: '', 
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
        addNewSubTopic() {
            this.subTopics.push(
                {
                    subTopic: this.newSubTopic, 
                    isComplete: false, 
                });

            this.newSubTopic = ''; 
        }, 
        deleteSubTopic(subTopicToDelete) {  
            this.subTopics = this.subTopics.filter( obj => obj.subTopic !== subTopicToDelete ); 
        },
        completeSubTopic(subTopicToComplete){
            const completed = this.subTopics.find( obj => obj.subTopic === subTopicToComplete); 
            completed.isComplete = true; // completed 
        }
    }
}
</script>