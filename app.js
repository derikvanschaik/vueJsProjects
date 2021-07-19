const app = Vue.createApp({
    data(){
        return {
            // init height-age fields as null. 
            height: null,
            weight: null,
            age: null,
            categories: ['Underweight', 'Normal', 'Overweight','Obese'],
            // fix this
            categoryColors : ['red', 'lightgreen', 'yellow', 'red'],
            userBmi: null,
            userBmiCategory: null, 
            showResults : false,
        }

    },
    computed: {
        formErrorMessage(){
            if (!this.validateFields()){
                return "Please Ensure all fields are Valid."; 
            }
            return "Valid Fields"; 
        }
    }, 
    methods:{
        errorOutput(field){
            if (!field){
                return; // null -still initialized -- no error output needed
            }
            const input = parseInt(field); 
            if (!Number.isInteger(input)){
                return 'Invalid input: Please Enter a number.'; // only want numbers in field 
            }
        },
        validateFields(){
            const validFields = [this.height, this.weight, this.age]
            .every( (field) => Number.isInteger(parseInt(field)));
            return validFields; //boolean indicating wether all fields are valid 
        }, 
        calculateBmi(){
            // do not calculate if fields are invalid 
            if (!this.validateFields()){
                return; 
            }
            this.formErrorMessage = ''; // reset error message
            this.showResults = true; 
            this.userBmi = (this.weight/(Math.pow(this.height, 2)))*702;
            this.userBmi = Math.round(this.userBmi * 10) / 10 // rounds the result to one decimal place
            let categoryIndex = null; 
            if (this.userBmi < 18.5){
                categoryIndex = 0; 
            }else if( 18.5 <= this.userBmi && this.userBmi <= 24.9){
                categoryIndex = 1; 
            }else if (25 <= this.userBmi && this.userBmi <= 29.9){
                categoryIndex = 2; 
            }else{
                categoryIndex = 3; 
            }
            this.userBmiCategory = this.categories[categoryIndex]; 
            
        },
        goBack(){
            // re initialize all fields 
            this.height = null;
            this.weight =null; 
            this.age = null; 
            this.showResults = false; 
        }
    }

}).mount("#assignment"); 