const { expect } = require('chai');
const mongoose = require('mongoose');
const Patient = require('../apis/Patients/Patients.Service');

describe('Patients Tests', function () {
  let client;
  before(function (done) {
    mongoose.connect(
      'mongodb://lindera:abc123@ds115758.mlab.com:15758/lindera',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
    );
    const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error')); // eslint-disable-line
      db.once('open', () => console.log('We are connected to Patients database!')) // eslint-disable-line 
      .then(() => {
        mongoose.connection.db.dropCollection('patients', () => {
          console.log('patients collection dropped'); // eslint-disable-line
        });
        done();
      });
  });

  after(function (done) {
    mongoose.connection.db.dropCollection('patients', () => {
        console.log('patients collection dropped'); // eslint-disable-line
      done();
    });
  });

  it('should create a new Patient', function (done) {
    let data = {
      firstName: 'john',
      lastName: 'dough',
      birthday: '1964-02-18'
    };
    let instance = new Patient(data);
    let Create = instance.addPatient();
    Create.then(result => {
      expect(result.firstName).to.equal(data.firstName);
      expect(result.lastName).to.equal(data.lastName);
      expect(new Date(result.birthday).toISOString())
        .to.equal(new Date(data.birthday).toISOString());
      done();
    });
  });

  it('should create another new Patient', function (done) {
    let data = {
      firstName: 'jane',
      lastName: 'dough',
      birthday: '1960-07-20'
    };
    let instance = new Patient(data);
    let Create = instance.addPatient();
    Create.then(result => {
      expect(result.firstName).to.equal(data.firstName);
      expect(result.lastName).to.equal(data.lastName);
      expect(new Date(result.birthday).toISOString())
        .to.equal(new Date(data.birthday).toISOString());
      done();
    });
  });

  it('should get 1 specific patient in the collection', function (done) {
    let data = { firstName: 'john', lastName: 'dough' };
    let instance = new Patient(data);
    let getOne = instance.getOnePatient();
    getOne.then(result => {
      client = result;
      expect(result.firstName).to.equal(data.firstName);
      expect(result.lastName).to.equal(data.lastName);
      done();
    });
  });

  it('should update 1 specific patient in the collection', function (done) {
    let data = { firstName: 'will', id: client.id };
    let instance = new Patient(data);
    let updateOne = instance.updatePatient();
    updateOne.then(result => {
      expect(result).to.equal(true);
      done();
    });
  });

  it('should delete 1 specific patient from the collection', function (done) {
    let instance = new Patient(client);
    let deleteOne = instance.deletePatient();
    deleteOne.then(result => {
      expect(result).to.equal(true);
      done();
    });
  });

  it('should get all patients from the collection', function (done) {
    let instance = new Patient();
    let getAll = instance.getPatients();
    getAll.then(result => {
      expect(result.length).to.equal(1);
      done();
    });
  });
});
