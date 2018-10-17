const assert = require('chai').assert;
const api = require('../server/controllers/api');
const chai = require('chai');
const chaiHttp = require('chai-http');

let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);



/*
//testing add project with auth check

describe('/login ', () => {
    it('Login a user', (done) => {
        let user = {
            email: "user1@gmail.com",
            password: "user1",
        }
        chai.request('http://localhost:3000')
            .post('/user/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.have.property('token');
                let token = "Bearer " + res.body.token;

                describe('Project',()=>{
                    it('should add a SINGLE project on /project POST',(done)=>{
                        chai.request('http://localhost:3000')
                        .post('/api/project')
                        .set('Authorization', token)
                        .send({'projectTitle': 'Employee Management', 'url': 'https://EmployeeManagement.com','description':'Employee management java project'})
                        .end(function(err, res){
                          res.should.have.status(200);
                          done();
                        });
                    })
                })
                done();
            });
    });
});
*/

//testing get all projects with auth check

describe('/login ', () => {
    it('Login a user', (done) => {
        let user = {
            email: "user1@gmail.com",
            password: "user1",
        }
        chai.request('http://localhost:3000')
            .post('/user/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.have.property('token');
                let token = "Bearer " + res.body.token;

                describe('Project', () => {
                    it('should list ALL projects on /projects GET',(done) => {
                        chai.request('http://localhost:3000')
                        .get('/api/projects')
                        .set('Authorization', token)
                        .end((err, res)=>{
                            res.should.have.status(200);
                            //res.body.should.be.a('array');
                            done();
                          });
                    });
                });
                done();
            });
    });
});


/*
//update project with auth check

describe('/login ', () => {
    it('Login a user', (done) => {
        let user = {
            email: "user1@gmail.com",
            password: "user1",
        }
        chai.request('http://localhost:3000')
            .post('/user/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.have.property('token');
                let token = "Bearer " + res.body.token;

                describe('Project',()=>{
                    it('should update a project on /project PUT',(done)=>{
                        chai.request('http://localhost:3000')
                        .put('/api/project/'+"5b27b2ef5a18962c8c6bd25e")
                        .set('Authorization', token)
                        .send({description:'updatetest'})
                        .end(function(err, res){
                          res.should.have.status(200);
                          done();
                        });
                    })
                })
                done();
            });
    });
});
*/

/*
//delete project with auth check

describe('/login ', () => {
    it('Login a user', (done) => {
        let user = {
            email: "user1@gmail.com",
            password: "user1",
        }
        chai.request('http://localhost:3000')
            .post('/user/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.have.property('token');
                let token = "Bearer " + res.body.token;

                describe('Project',()=>{
                    it('should delete a project on /project DELETE',(done)=>{
                        chai.request('http://localhost:3000')
                        .delete('/api/project/'+"5b27b2ef5a18962c8c6bd25e")
                        .set('Authorization', token)
                        .end(function(err,res){
                            res.should.have.status(200);
                            done();
                        });
                    })
                });
                done();
            });
    });
});
*/

/*
//search projects by project title with auth check

describe('/login ', () => {
    it('Login a user', (done) => {
        let user = {
            email: "user1@gmail.com",
            password: "user1",
        }
        chai.request('http://localhost:3000')
            .post('/user/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.have.property('token');
                let token = "Bearer " + res.body.token;

                describe('Project', () => {
                    it('should list SINGLE project on /:projectTitle GET',(done) => {
                        chai.request('http://localhost:3000')
                        .get('/api/projects/search/:projectTitle'+"Employee Management")
                        .set('Authorization', token)
                        .end((err, res)=>{
                            res.should.have.status(200);
                            done();
                          });
                    });
                });
                done();
            });
    });
});
*/
