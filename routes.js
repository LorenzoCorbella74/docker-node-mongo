const express = require('express');
const router = express.Router();

const collection = "test-collection";
const db = require("./db");

// read
router.get('/getAll', (req, res) => {
    // get all Todo documents within our todo collection
    // send back to user as json
    db.getDB().collection(collection).find({}).toArray((err, documents) => {
        if (err)
            console.log(err);
        else {
            res.json(documents);
        }
    });
});

// update
router.get('/:id', (req, res) => {
    // Primary Key of Todo Document we wish to update
    const todoID = req.params.id;

    // Find Document By ID and Update
    db.getDB()
        .collection(collection)
        .findOne({
            _id: db.getPrimaryKey(todoID)
        }, (err, result) => {
            if (err)
                console.log(err);
            else {
                res.json(result);
            }
        });
});

// update
router.put('/:id', (req, res) => {
    // Primary Key of Todo Document we wish to update
    const todoID = req.params.id;
    // Document used to update
    const userInput = req.body;
    // Find Document By ID and Update
    db.getDB().collection(collection).findOneAndUpdate({
        _id: db.getPrimaryKey(todoID)
    }, {
        $set: {
            todo: userInput.todo
        }
    }, {
        returnOriginal: false
    }, (err, result) => {
        if (err)
            console.log(err);
        else {
            res.json(result);
        }
    });
});


//create
router.post('/', (req, res, next) => {
    // Document to be inserted
    const userInput = req.body;

    db.getDB().collection(collection).insertOne(userInput, (err, result) => {
        if (err) {
            const error = new Error("Failed to insert Todo Document");
            error.status = 400;
            next(error);
        } else
            res.json({
                result: result,
                document: result.ops[0],
                msg: "Successfully inserted Todo!!!",
                error: null
            });
    });
});

//delete
router.delete('/:id', (req, res) => {
    // Primary Key of Todo Document
    const todoID = req.params.id;
    // Find Document By ID and delete document from record
    db.getDB().collection(collection).findOneAndDelete({
        _id: db.getPrimaryKey(todoID)
    }, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json(result);
    });
});

// isert some data
router.post('/populate', (req, res) => {
    // Primary Key of Todo Document
    const todoID = req.params.id;
    // Find Document By ID and delete document from record
    db.getDB().collection(collection).insertMany([{
        name: "Alex",
        age: 19
    }, {
        name: "Albert",
        age: 20
    }, {
        name: "Bob",
        age: 19
    }], (err, result) => {
        if (err)
            console.log(err);
        else
            res.json(result);
    });
});

module.exports = router;