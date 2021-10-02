const path = require('path'); 
const express = require('express'); 
const cors = require('cors'); 
const app = express();

// middleware
app.use(express.static(path.join(__dirname, '../public') ));
app.use(express.json());
app.use(cors()); 
const port = process.env.PORT || 3000; 

app.get('/', (req, res) =>{
    res.sendFile('index.html', path.join(__dirname));   
});

const posts = require('./routes/api/posts'); 
app.use('/', posts);  

app.listen(port, ()=>{
    console.log(`listening on port ${port}`); 
}); 