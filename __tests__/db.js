/* Importing User model, Rx model, regenerator-runtime and 
mongoose for testing mongodb/mongoose with async*/
import User from '../server/models/userModel';
import Rx from '../server/models/rxModel';
import "regenerator-runtime/runtime";
import mongoose from 'mongoose';

xdescribe('User', () => {
  let username;
  let password;
  let rxs;

  /*Before any tests begin, connect to the MongoDB "DDI" connection 
    and set test user data*/
 beforeAll(async () => {
    await mongoose.connect('mongodb+srv://charlesg:codesmith1234@noodle1.5i6rq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        dbName: 'DDI'
      });
    //create test user data
    username = 'Jonnie';
    password = 'codesmith1234';
    rxs = [{
        rxId: '612eb9dd224da109cf30e493',
        name: 'doxycycline'
      }];
  })
  
  // delete test user after all test are complete 
  // close all open connections to db
  afterAll(async () => {
    //delete test user
    await User.deleteOne({
      username: username,
    });
    // await db.close();
    await mongoose.connection.close();
  })

  it('creates a user', async () => {
    // check if user exists in db, should not exist.
    const user = await User.findOne({username: username});
    expect(user).toBe(null);
    // create the user
    const createUser = await User.create({
      username: username,
      password: password,
      rxs: rxs
    })
    // check if user exists again. should exist;
    expect(typeof createUser).toBe('object');
    // check if new user exists in db
    const newUser = await User.findOne({username: username});
    expect(typeof newUser).toBe('object');
  })
  
  it('find a user and push to the rxs array', async () => {
    // find an existing user
    const user = await User.findOne({username: username});
    expect(typeof user).toBe('object');
    expect(user.rxs.length).toEqual(1);
    // push to the rxs array
    const pushRxs = await User.findOneAndUpdate( 
      {username: username}, 
      {$push: {
        rxs: {name: 'warfarin', rxId: '612eba97224da109cf30e494'}
      }}, 
      {new: true}
    )
    //check that rxs is an array
    expect(pushRxs.rxs).toBeInstanceOf(Array);
    //check the drug was added to the array
    expect(pushRxs.rxs).toHaveLength(2);
  })
  it('find a user and pull from the rxs array', async () => {
    // find an existing user
    const user = await User.findOne({username: username});
    expect(typeof user).toBe('object');
    expect(user.rxs.length).toEqual(2);
    // push to the rxs array
    const pushRxs = await User.findOneAndUpdate( 
      {username: username}, 
      {$pull: {
        rxs: {name: 'warfarin', rxId: '612eba97224da109cf30e494'}
      }}, 
      {new: true}
    )
    //check that rxs is an array
    expect(pushRxs.rxs).toBeInstanceOf(Array);
    //check the drug was pulled from the array
    expect(pushRxs.rxs).toHaveLength(1);
  })
})

xdescribe('Rx', () => {
  let rx;
  
  /*Before any tests begin, connect to the MongoDB "DDI" connection 
  and set test user data*/
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://charlesg:codesmith1234@noodle1.5i6rq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        dbName: 'DDI'
      });
    // rx name
    rx = ['warfarin'];
  })
  
  // delete test user after all test are complete 
  // close all open connections to db
  afterAll(async () => {
    // await db.close();
    await mongoose.connection.close();
  })
  
  it('find a specific Rx within our database', async () => {
    const result = await Rx.findOne({ name: rx[0] });
    expect(typeof result).toBe('object');    
  })
})