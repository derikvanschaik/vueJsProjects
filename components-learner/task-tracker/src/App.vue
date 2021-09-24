<template>
    <h1>Task Tracker</h1>
    <input placeholder="add new topic" v-model="newTopic"> 
    <h2>{{errorMessage}}</h2>
    <button @click="addNewTopic">Add Task Topic</button>    
    <hr>
    <task-topic
        v-for="topic in topics"
        :key="topic.id"
        :topic="topic.topicName"
        @delete-topic="removeTopic" 
    >
    </task-topic>
    <h4 v-if="topics.length === 0">No Topics To Show</h4>  
</template>

<script>
import TaskTopic from './components/TaskTopic.vue'; 
export default {
  components: { TaskTopic },
    data() {
        return{
            key: 0, 
            newTopic : '',
            errorMessage: '', 
            topics: [
            ],  
        }
    }, 
    methods: {
        addNewTopic(){
            
            const alreadyATopic = this.topics.map( obj => obj.topicName ).includes(this.newTopic); 
            if (alreadyATopic){
                this.errorMessage = `'${this.newTopic}' already exists.`; 
                this.newTopic =''; 
                return; 
            }

            if (this.newTopic === ""){
                this.errorMessage = `Topic cannot be empty.`;
                this.newTopic =''; 
                return; 
            }
             
            this.topics.push( { topicName : this.newTopic, id: this.key++ }); 
            this.newTopic ='';
            this.errorMessage = '';  
            
        }, 
        removeTopic(topicToDelete){ 
            this.topics = this.topics.filter( obj => obj.topicName !== topicToDelete ); 
        }
    }
}
</script>
