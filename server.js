import express from 'express';
import Database from './models/Voc.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));




app.get("/delete/:id", async function (req, res) {
  await Database.delete({ idtablevoc: req.params.id });
  res.redirect('/vocabulary_page');
});



app.get("/", async function (req, res) {
  const colonne = await Database.loadMany();
  res.render('ecran_principal.ejs', {colonne});

});


app.post("/addnewword", async function (req, res) {
  const newword = new Database();
  const newtranslation = new Database();
  newword.word = req.body.newword 
  newtranslation.translation = req.body.newtranslation                                   
  await newword.save();
  await newtranslation.save();
  res.redirect('/');
});


app.post("/addword", async function (req, res) {
  const word_enter = new Database();
  word_enter.word = req.body.word_enter                                   
  await word_enter.save();
  res.redirect('/');
});


  //diriger sur autre page
app.get("/vocabulary_page", async function (req,res){
    const colonne = await Database.loadMany();
    res.render('ecran_vocabulaire.ejs', {colonne})
})


app.listen(3000, function () {
  console.log('Server is running on port 3000')
});



