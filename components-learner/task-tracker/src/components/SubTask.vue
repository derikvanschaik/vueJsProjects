<template>

    <h4>{{subTask}}</h4>
    <h6>{{isComplete? 'Completed': 'Not Complete'}}</h6> 
    <button v-if="!isComplete" @click="completeTask">Done Task</button> 
    <button @click="deleteTask">Delete</button>

</template>

<script>
export default {
    props:['subTask', 'isComplete'], 
    data() {
        return {
        }
        
    }, 
    methods: {
        deleteTask(){
            this.$emit('delete-sub-task', this.subTask); 
        },
        completeTask(){
            this.$emit('complete-sub-task', this.subTask); 
        }
    } 
}
</script>