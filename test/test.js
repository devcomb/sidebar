var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app/server');
var should = chai.should();

chai.use(chaiHttp);

describe('basic', function() {
    after(function() {
        app.close();
    });

    it('responds with status 200', function(done) {
        chai.request(app)
        .get('/')
        .end(function(err, res){
            res.should.have.status(200);
            app.close(done());
        });
    });
    it('returns json', function(done) {
        chai.request(app)
        .get('/json')
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('value');
            res.body.value.should.equal('test');
            app.close(done());
        })
    })
});
