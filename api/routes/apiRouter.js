const express = require('express')
const router = express.Router();

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
router.get('/objects', (req, res) => {
  res.sendStatus(501);
})

// Gets data for an object
router.get('/object/:objectId', (req, res) => {
  const { objectId } = req.params;
  console.log(`request received for object ${objectId}`);
  res.sendStatus(200);
});

// Creates a new object
router.post('/object', (req, res) => {
  res.sendStatus(501);
})

// Updates data for an object
router.put('object/:objectId', (req, res) => {
  const objectId = req.params.objectId;
  res.sendStatus(501);
})

// Creates comment for a specific object
router.post('/object/:objectId/comment', (req, res) => {
  const { commentBody } = req.body;
  res.sendStatus(501);
})

router.delete('/object/:objectId', (req, res) => {
  
})

module.exports = router;