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
                {{subTopic}}
            </li>
        </ul>        
    </div>

</template>

<script>
export default {
    props:['topic'], 
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
        }
    }
}
</script>