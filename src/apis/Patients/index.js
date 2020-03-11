const { Router } = require('express');

const {
  getPatients, getOnePatient, addPatient, updatePatient, deletePatient
} = require('./Patients.Controller');

let router = new Router();

router.get('/', getPatients);

router.get('/patient', getOnePatient);

router.post('/', addPatient);

router.patch('/', updatePatient);

router.delete('/', deletePatient);

module.exports = router;
