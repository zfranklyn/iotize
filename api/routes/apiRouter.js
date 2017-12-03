const express = require('express')
const router = express.Router();
const UserModel = require('../db/UserSchema');
const ObjectModel = require('../db/ObjectSchema');

/*
/api/object/:id
const { id } = req.params;
(equivalent: const id = req.params.id;)

/api/object?query1=hello?query2=world
const { query1, query2 } = req.query;

/api/object       with body data
const { bodyProp1, bodyProp2 } = req.body;

*/

// Gets data for all objects
router.get('/objects', (req, res, next) => {
  ObjectModel.find({})
  .then((results) => {
    console.log(results);
    res.json(results);
  })
  .catch((err) => {
    console.log(err);
    next(err);
  });
})

// Gets data for an object
router.get('/object/:objectId', (req, res) => {
  const { objectId } = req.params;
  
  ObjectModel.findOne({_id: objectId})
  .then((found) => res.json(found))
  .catch(console.log);

  
});

// Creates a new object
router.post('/object', (req, res) => {
  const { name, details, actions } = req.body;
  ObjectModel.create({
    name,
    details,
    actions,
  })
  .then((createdObject) => {
    res.json(createdObject);
  })
  .catch((err) => {
    next(err);
  })

})

// Updates data for an object
router.put('/object/:objectId', (req, res) => {
  const { objectId } = req.params;
  const { newObjectData } = req.body;
  ObjectModel.findOneAndUpdate({_id: objectId}, {
    $set: newObjectData,
  }, {new: true})
  .then((updatedObject) => {
    res.json(updatedObject);
  })
  .catch((err) => {
    next(err);
  })
})

// Creates comment for a specific object
router.post('/object/:objectId/comment', (req, res, next) => {
  const { commentBody } = req.body;
  console.log(`commentBody: ${commentBody}`);
  const { objectId } = req.params;
  console.log(`objectId: ${objectId}`);
  const userCookie = req.cookies.yhack;
  console.log(`yhack cookie: ${userCookie}`);
  
  ObjectModel.findOne({_id: objectId})
  .then((foundObject) => {
    foundObject.comments.push({
      userId: userCookie,
      comment: commentBody,
      timestamp: Date(),
    })
    return foundObject.save()
  })
  .then((objWithNewComment) => {
    res.json(objWithNewComment);
  })
  .catch(next);

})

router.delete('/object/:objectId', (req, res) => {
  
})

module.exports = router;