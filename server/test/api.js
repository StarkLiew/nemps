const request = require('supertest')
const chaiHttp = require('chai-http')
const { expect } = require('chai')
const chai = require('chai')
const server = require('../index')


chai.use(chaiHttp)

  describe('/GET users', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/users')
            .end((err, res) => {
                  res.should.have.status(200);
                  //res.body.should.be.a('array');
                  //res.body.length.should.be.eql(0);
                  done();
            });
      });
  });