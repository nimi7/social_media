const router = require("express").Router();
const Posts = require('../models/Posts');





router.get('/Posts', async (req, res) => {
  return Posts.find({}).sort({ createdAt: -1 })
    .then((date) => {
      res.status(200).send(date);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
})
router.post('/Posts', async function (req, res, next) {
  console.log('This is password Post')

  
  const { userPost, Pic, status, likes, commands, userprofilePic, usernamePost } = req.body

  const post = new Posts({
    userPost,
    usernamePost,
    userprofilePic,
    Pic,
    status,
    likes,
    commands,
  });
  try {
    await post.save();
  } catch (err) {
    return next(err);
  }
  res.redirect('/');
});

router.put('/Commands/:id', async (req, res) => {

  console.log('req.body', req.body)
  const updateData = {
    $addToSet: { commands: [req.body] },
  };
  console.log(updateData);

  await Posts.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true },
    function (err, result) {
      res.send(result);

    }
  );
})

router.put('/like', async (req, res) => {

  console.log('req.body', req.body)
  const updateData = {
    likes: req.body,
  };
  console.log(updateData);

  await Posts.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true },
    function (err, result) {
      res.send(result);

    }
  );
})

router.delete("/DeletePost/:id", async (req, res) => {

 console.log('req.params.id',req.params.id)
  const id = req.params.id;
  
  Posts.findByIdAndRemove({ _id: id })
    .then((results) => {
      res.status(200).json(results).redirect('/');
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  res.redirect('/');
});

module.exports = router;