import User from '../models/userModel';

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    await User.create({ username, password, rxs: []})
    return next();
  } catch (err) {
    return next({ err })
  }
};

userController.findOne = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username: username }).exec();
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({ err })
  }
};

userController.verifyUser = async (req, res, next) => {
  try {
    if (res.locals.user) {
      const { password } = req.body;
      const user = res.locals.user;
      const match = await user.comparePasswords(password, user.password);
      res.locals.match = match;
      if (!match) {
        res.locals.user.rx = [];
      }
    } else {
      res.locals.match = false;
      res.locals.user = {rxs: [], id: ''};
    }

    return next();
  } catch (err) {
    return next({ err })
  }
};

userController.logOut = async (req, res, next) => {
  try {
    return next();
  } catch (err) {
    return next({ err })
  }
};

// userController.checkRxExists = async (req, res, next) => {
//   try {

//   } catch (err) {
//     return next({ err });
//   }
// }

userController.addRx = async (req, res, next) => {
  try {
    const { userId, rx } = req.body;
    const { id } = res.locals.rxs[0];
    const user = await User.findOneAndUpdate( 
      {_id: userId}, 
      {$push: {
        rxs: {name: rx[0], rxId: id}
      }}, 
      {new: true}
    ).exec();

    res.locals.id = id;
    
    return next();

  } catch (err) {
    return next({ err })
  }
};


userController.deleteRx = async (req, res, next) => {
  try {
    const { medData, userId } = req.body;
    const user = await User.findOneAndUpdate( 
      {_id: userId}, 
      {$pull: {
        rxs: {name: medData}
      }}, 
      {new: true});
    return next();
  } catch (err) {
    return next({ err })
  }
};

export default userController;