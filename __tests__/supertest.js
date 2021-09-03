const request = require('supertest');
const server = 'http://localhost:3000';

xdescribe('Route integration', () => {
  describe('/user', () => {
    // currently x'd so that it doesnt create alot of new users
    xdescribe('/signUp', () => {
      it('Should send back a status of 200', () => {
        return request(server)
          .post('/user/signUp')
          .send({username: 'username1', password: 'password2'})
          .expect(200);
      })
    })
    describe('/user/login', () => {
      it('Should send back the match boolean, rxs array and id string', () => {
        return request(server)
          .post('/user/login')
          .send({username: 'username', password: 'password'})
          .then(res => {
            expect(res.body.match).toEqual(true);
            expect(res.body.rxs).toBeInstanceOf(Array);
            expect(typeof res.body.id).toBe('string');
          })
      })
    })
    describe('/user/logout', () => {
      it('Should send back a status of 200', () => {
        return request(server)
          .post('/user/logOut')
          .expect(200);
      })
    })
    describe('/user/addRx', () => {
      it('Should send back the id of the drug added to the list', () => {
        return request(server)
          .post('/user/addRx')
          .send({rx: ['warfarin'], userId: '612eb88eac70014dae77edab'})
          .then(res => {
            expect(typeof res.body).toBe('string');
            expect(200);
          });
      })
    })
    describe('/user/deleteRx', () => {
      it('Should send back a status of 200', () => {
        return request(server)
          .patch('/user/deleteRx')
          .send({medData: 'warfarin', userId: '612eb88eac70014dae77edab'})
          .expect(200);
      })
    })
  })
  describe('/rx', () => {
    describe('/', () => {
      it('Should send back a status of 200', () => {
        return request(server)
          .post('/rx/')
          .send({rx: [{name: 'warfarin', id: '612eba97224da109cf30e494'}], otc: 'aspirin'})
          .then(res => {
            expect(res.body).toBeTruthy();
            expect(200);
          })
      })
    })
  })
})