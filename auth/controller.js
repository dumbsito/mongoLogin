const User = require('./dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createUser = (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  }

  User.create(newUser, (err, user) => {
    if (err && err.code === 11000) return res.send({emailExist: true});
    if (err) return res.send({emailExist: 'ServerError'});
   const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: user.id },
      SECRET_KEY, {
        expiresIn: expiresIn
      });
    const dataUser = {
      name: user.name,
      email: user.email,
      accessToken: accessToken,
      expiresIn: expiresIn
    }
    
    res.send({ dataUser });
  
  });
}

exports.loginUser = (req, res, next) => {
  const userData = {
    email: req.body.email,
    password: req.body.password
  }
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) return res.send({response:"serverError"});

    if (!user) {
      // email does not exist
      res.send({ response: 'notExists' });
    } else {
      const resultPassword = bcrypt.compareSync(userData.password, user.password);
      if (resultPassword) {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

        const dataUser = {
          name: user.name,
          email: user.email,
          accessToken: accessToken,
          expiresIn: expiresIn
        }
         
        res.send({ dataUser });
      
      } else {
        // password wrong
        res.send({response: 'passwordIncorrect'});
      }
    }
  });
}










