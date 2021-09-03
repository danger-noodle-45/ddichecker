import { Router } from 'express';
import userController from '../controllers/userController.js';
import rxController from '../controllers/rxController.js';

const router = Router();

router.post ('/signUp', 
  userController.createUser, 
  (req, res) => {
    res.sendStatus(200);    
  })

router.post('/login', 
  userController.findOne,
  userController.verifyUser, 
  (req, res) => {
    // const rxNames = res.locals.user.rxs( rx => rx.name);
    res.status(200).json( { match: res.locals.match,
    rxs: res.locals.user.rxs,
    id: res.locals.user.id });
})

router.post('/logout', 
  userController.logOut, 
  (req, res) => {
  res.status(200).send('Logged out!');
})

router.post('/addRx', 
  rxController.getRx,
  // userController.checkRxExists,
  userController.addRx, 
  (req, res) => {
  res.status(200).json( res.locals.id );
})

router.patch('/deleteRx', 
  userController.deleteRx, 
  (req, res) => {
    return res.sendStatus(200);
  }
)

export default router;