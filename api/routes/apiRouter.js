const express = require('express')
const router = express.Router();

router.get('/object/:objectId', (req, res) => {
  const { objectId } = req.params;
  console.log(`request received for object ${objectId}`);
  res.sendStatus(200);
});

router.get('/object/:objectId/comments', (req, res) => {

});

router.post('/object/:objectId/comment', (req, res) => {
  const { commentBody } = req.body;

})

module.exports = router;