const { ObjectId } = require("mongodb");
module.exports = function (app, passport, db) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================
  // Get the logged-in user's songs and send them to the profile page.
  app.get('/profile', isLoggedIn, function (req, res) {
    db.collection('songs').find({
      userId: req.user._id
    }).toArray((err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).send('Unable to load your songs.')
      }

      res.render('profile.ejs', {
        user: req.user,
        songs: result
      })
    })
  })

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout(() => {
      console.log('User has logged out!')
    });
    res.redirect('/');
  });

  // message board routes ===============================================================

  // Save a song for the user who is logged in.
  // Check the song information, then save it for the logged-in user.
  app.post('/songs', isLoggedIn, (req, res) => {
    const title = (req.body.title || '').trim()
    const artist = (req.body.artist || '').trim()
    const year = Number(req.body.year)

    if (!title) {
      return res.status(400).send('Please enter a song title.')
    }

    if (!artist) {
      return res.status(400).send('Please enter an artist.')
    }
    if (!Number.isInteger(year) || year < 1990 || year > 1999) {
      return res.status(400).send(
        'Please enter a whole-number release year between 1990 and 1999.'
      )
    }
    db.collection('songs').insertOne({
      userId: req.user._id,
      title: title,
      artist: artist,
      year: year,
      favorite: false
    }, (err, result) => {
      if (err) {
        return res.status(500).send(
          'Unable to save song. Please try again.'
        )
      }

      console.log('Song saved to database')
      res.redirect('/profile')
    })
  })

  // Change favorite status for a song belonging to the logged-in user.
  app.put('/songs', isLoggedIn, (req, res) => {
    const id = req.body.id
    const favorite = req.body.favorite

    if (!ObjectId.isValid(id)) {
      return res.status(400).send('Invalid song ID.')
    }

    if (typeof favorite !== 'boolean') {
      return res.status(400).send('Favorite must be true or false.')
    }

    db.collection('songs').updateOne(
      {
        _id: new ObjectId(id),
        userId: req.user._id
      },
      {
        $set: { favorite: favorite }
      },
      (err, result) => {
        if (err) {
          console.error(err)
          return res.status(500).send('Could not update your song.')
        }

        if (result.matchedCount === 0) {
          return res.status(404).send('Song not found.')
        }
        res.send('Favorite status updated!')
      }
    )
  })



  // Delete a song that belongs to the logged-in user.
  app.delete('/songs', isLoggedIn, (req, res) => {
    const id = req.body.id

    if (!ObjectId.isValid(id)) {
      return res.status(400).send('Invalid song ID.')
    }
    db.collection('songs').deleteOne(
      {
        _id: new ObjectId(id),
        userId: req.user._id
      },
      (err, result) => {
        if (err) {
          console.error(err)
          return res.status(500).send('Could not delete your song.')
        }
        if (result.deletedCount === 0) {
          return res.status(404).send('Song not found.')
        }
        res.send('Song deleted!')
      }
    )
  })
  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    let user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect('/profile');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
