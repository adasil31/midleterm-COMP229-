//File name: Midterm Summer 2021 - Comp 229
//name: Alessandro da Silva Santos, Author's name: Alessandro da Silva Santos, StudentID: 300927354

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', {
    title: 'Add a new Book',
    books: {
      Title: '',
      Author: '',
      Price: null,
      Genre: '',
    }
  });


});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  let newBook = book({
    "title": req.body.title,
    "price": req.body.price,
    "author": req.body.author,
    "Genre": req.body.genre
  });
  book.create(newBook, (err, Book) =>{
    if(err) {
        console.log(err);
        res.end(err);
    } else {
          res.redirect('/books');
    }
});

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  let id = req.params.id;

  Book.findById(id, (err, updateBook) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          res.render('books/details', {title: 'Updating your Book', books: updateBook})
      }
  });

});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let id = req.params.id;

  let bookUpdate = Book({
      "_id": id,
      "title": req.body.title,
      "author": req.body.author,
      "price": req.body.price,
      "genre": req.body.genre
  });
  Book.updateOne({_id: id}, bookUpdate, (err) => {
    if(err)
    {
        console.log(err);
        res.end(err);
    } else {
        res.redirect('/books');
    }
});

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

  Book.remove({_id: id}, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
        res.redirect('/books');
      }
  });

});


module.exports = router;