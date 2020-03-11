const { Router } = require('express');
const PatientsRoutes = require('../apis/Patients/index');

let router = new Router();

router.use('/', PatientsRoutes);

module.exports = router;
