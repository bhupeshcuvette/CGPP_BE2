const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const methodOverride = require('method-override');

dotenv.config()

const Recipe = require('./models/Recipe')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./public'))
app.use(methodOverride());
app.set('view engine', 'ejs')

app.get("/recipes", (req, res) => {
    Recipe.find().then((result)=>{
        res.render('recipes',{recipes:result}).catch((error)=>{res.json({error:"Error retrieving recipes"})});

    })
});

app.get("/",(req,res)=>{
    res.redirect('/recipes');

});

app.get('/create-recipe',(req,res)=>{
    res.render('create-recipe');
})

app.post('/create-recipe',(req,res)=>{
    const {recipeName,recipeTime,ingredients,serves}=req.body;
    const recipe = new Recipe({
        recipeName:recipeName,
        recipeTime:recipeTime,
        ingredients:ingredients,
        serves:serves
    }).save().then(()=>{res.send('Successfully created new recipe'); res.redirect('/recipes');}).catch((error)=>{res.json({error:"Error creating recipe"})});

});

app.get('/:id/delete-recipe',(req,res)=>{
    const recipe = Recipe.findById(req.params.id);
    res.render('delete-recipe',{recipe});
});


app.post('/:id/delete-recipe',(req,res)=>{
    const id= req.params.id;
    Recipe.findByIdAndDelete(id).then((result)=>{res.send("Successfully deleted recipe");res.redirect('/recipes')}).catch((error)=>{res.json({error:"Error deleting recipe"})});

});

app.get('/:id/update-recipe',(req,res)=>{
    const recipe = Recipe.findById(req.params.id);
    res.render('update-recipe',{recipe});
});

app.post('/:id/update-recipe',(req,res)=>{
    const id = req.params.id;
    alert(id);
    const {recipeName,recipeTime,ingredients,serves}=req.body;
    Recipe.findByIdAndUpdate(id,{recipeName,recipeTime,ingredients,serves}).then((result)=>{res.send("Successfully updated recipe");res.redirect('/recipes')}).catch((error)=>{res.json({error:"Error updating recipe"})});
})



app.listen(process.env.PORT||3000, () => {
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() =>
        console.log(`Server running on http://localhost:${process.env.PORT}`)
      )
      .catch((err) => console.log(err));
  });

