<template>
    <label >{{taskType}}</label>
    <br> 
    <input v-model="newTask"> 
    <h2>{{errorMessage}}</h2>
    <button @click="addNewTask">Add {{taskType}}</button>  
</template>

<script>
export default {
    props: ['taskType', 'errorMessage'],
    emits: ['add-task'],  
    data(){
        return{
            newTask: '', 

        }
    },
    methods: { 
        addNewTask() {
            this.$emit('add-task', this.newTask);
            this.newTask = ''; 
        }
    }


}
</script>
