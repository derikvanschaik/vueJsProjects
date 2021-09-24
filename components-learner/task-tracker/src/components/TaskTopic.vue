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
                :key="subTopic"> 
                <sub-task :subTask="subTopic"
                            @delete-sub-task="deleteSubTopic">
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
            this.subTopics.push(this.newSubTopic);
            this.newSubTopic = ''; 
        }, 
        deleteSubTopic(subTopicToDelete) {
            this.subTopics = this.subTopics.filter( subTopic => subTopic !== subTopicToDelete ); 
        }
    }
}
</script>