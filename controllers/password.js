const router = require("express").Router();
const User = require('../models/password');
const passport = require('passport');
require('connect-flash')



// router.get('/password', function (req, res, next) {

//   res.send(`${req.flash('error')}`);
// });
// router.get('/password', function (req, res, next) {

//     res.send(req.flash('error')); 

// });
router.get('/password', function (req, res, next) {

  res.send(req.user);

});




router.get('/getUser', function (req, res, next) {

  return User.findById(req.query.userId)
    .then((date) => {

      res.status(200).send(date);
    })
    .catch((err) => {

      console.log(err);
      res.status(500);
    });

});

router.get('/SerachUsers', async (req, res, next) => {
  try {
    await User.find({}).then((user) => {
      res.status(200).send(user)
    })
  } catch (err) {
    console.log(err)
    res.status(500)

  }

})

router.post('/logout', function (req, res, next) {
  try {
    res.cookie('session', ' ', { maxAge: 1 });

  } catch (err) {
    res.status(500).send(err)
  }


  res.redirect('/Login')
});
router.get('/error', function (req, res, next) {

  res.send(req.flash('error'));

});
router.get('/signin', function (req, res, next) {

  res.send(req.flash('error'));

});




router.get('/Passwords/edit/:id', (req, res) => {

  User.findById({ _id: req.params.id }, (err, guide) => {
    if (err) {
      return res.status(400).json({ success: false, error: `guide not found` })
    }
    if (!guide) {
      return res.status(404).json({ success: false, error: `guide not found` })
    }
    return res.status(200).json({ success: true, data: guide })
  }).catch(err => console.log(err))
});


router.get('/User/:id', (req, res) => {

  User.findOne({ _id: req.params.id }, (err, guide) => {
    if (err) {
      return res.status(400).json({ success: false, error: `guide not found` })
    }
    if (!guide) {
      return res.status(404).json({ success: false, error: `guide not found` })
    }
    return res.status(200).json({ success: true, data: guide })
  }).catch(err => console.log(err))
});

router.get('/passwords', function (req, res, next) {

  res.send(req.error);

});

router.post('/passwords', async function (req, res, next) {
  const { name, email, password, profilePic } = req.body

  const post = new User({
    name,
    email,
    password,
    profilePic
  });
  try {

    await post.save();
    res.status(200).send(post)
  } catch (err) {
    console.log('err', err);
    return res.status(404).json({ error: 'err._message' })

  }

});




router.delete("/Password/:id", (req, res) => {


  const id = req.params.id;
  User.findByIdAndRemove({ _id: id })
    .then((results) => {
      res.status(200).json(results).redirect('/');
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  res.redirect('/');
});




router.post('/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/Login',
    failureFlash: true,
  })

);




router.put("/password/followins/:id", (req, res) => {
  const { followins } = req.body

  const updateData = {
    $addToSet: { followins: followins },
  };


  User.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true },
    function (err, result) {
      res.send(result);

    }
  );


});

router.put('/password/getbyemail/:email', function (req, res, next) {
  const { followins } = req.body

  const updateData = {
    $addToSet: { followins: req.params.email },
  };
  console.log(updateData);

  User.findByIdAndUpdate(
    req.params.email,
    updateData,
    { new: true },
    function (err, result) {
      res.send(result);

    }
  );
})
router.put("/password/getbyemail/:email", (req, res) => {
  const { followins } = req.body

  const updateData = {
    $addToSet: { followins: followins },
  };
  console.log(updateData);

  User.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true },
    function (err, result) {
      res.send(result);

    }
  );


});



router.put("/password/Unfollowins/:id", (req, res) => {
  const { followins } = req.body

  const updateData = {
    $pull: { followins: followins },
  };
  console.log(updateData);

  User.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true },
    function (err, result) {
      res.send(result);

    }
  );
});

router.get('/password/followers', (req, res) => {

})


router.put("/password/:id", (req, res) => {
  const { name, email, profilePic, CoverPic } = req.body
  console.log('This is Put new', profilePic, CoverPic)
  const updateData = {
    name: name,
    last: email,
    profilePic: profilePic,
    CoverPic: CoverPic,

  };
  console.log(updateData);

  User.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true },
    function (err, result) {
      res.send(result);

    }
  );

});



module.exports = router;