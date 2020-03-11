const Patient = require('./Patients.Service');
const { validate } = require('../../services/ValidationService');

module.exports = {
  getPatients: async (req, res, next) => {
    const instance = new Patient();
    try {
      const data = await instance.getPatients();
      return res.status(200).json(data);
    } catch (e) {
      e.status = 403;
      return next(e);
    }
  },

  getOnePatient: (req, res, next) => {
    let firstNameValid = validate(req.query.firstName, 'firstName', 'displayName');
    let lastNameValid = validate(req.query.lastName, 'lastName', 'displayName');

    if (firstNameValid) return next(firstNameValid);
    if (lastNameValid) return next(lastNameValid);

    let { firstName, lastName } = req.query;
    const instance = new Patient({ firstName, lastName });
    return instance
      .getOnePatient()
      .then(data => {
        if (data === null) {
          let err1 = new Error('Patient not found!');
          err1.status = 403;
          return next(err1);
        }
        return res.status(200).json(data);
      })
      .catch(e => {
        e.status = 403;
        return next(e);
      });
  },

  addPatient: (req, res, next) => {
    let firstNameValid = validate(req.body.firstName, 'firstName', 'displayName');
    let lastNameValid = validate(req.body.lastName, 'lastName', 'displayName');
    let birthdayValid = validate(req.body.birthday, 'birthday, yyyy-mm-dd', 'birthday');

    if (firstNameValid) return next(firstNameValid);
    if (lastNameValid) return next(lastNameValid);
    if (birthdayValid) return next(birthdayValid);

    let {
      firstName, lastName, birthday
    } = req.body;

    const instance = new Patient({ firstName, lastName, birthday });
    return instance
      .addPatient()
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(e => {
        e.status = 403;
        return next(e);
      });
  },

  updatePatient: (req, res, next) => {
    let idValid = validate(req.body.id, 'id', 'uuid');
    if (idValid) return next(idValid);

    if (!req.body.firstName || !req.body.lastName) {
      let e = {};
      e.status = 403;
      e.message = 'firstName or lastName at least required';
      return next(e);
    }

    if (req.body.firstName) {
      let firstNameValid = validate(req.body.firstName, 'firstName', 'displayName');
      if (firstNameValid) return next(firstNameValid);
    }
    if (req.body.lastName) {
      let lastNameValid = validate(req.body.lastName, 'lastName', 'displayName');
      if (lastNameValid) return next(lastNameValid);
    }

    let {
      id, firstName, lastName
    } = req.body;

    const instance = new Patient({
      id, firstName, lastName
    });
    return instance
      .updatePatient()
      .then(data => {
        if (data === null) {
          let err1 = new Error('Patient not found!');
          err1.status = 403;
          return next(err1);
        }
        return res.status(200).json('Done');
      })
      .catch(e => {
        e.status = 403;
        return next(e);
      });
  },

  deletePatient: (req, res, next) => {
    let idValid = validate(req.body.id, 'id', 'uuid');
    if (idValid) return next(idValid);
    let { id } = req.body;
    const instance = new Patient({ id });
    return instance
      .deletePatient()
      .then(data => {
        if (data === false) {
          let err1 = new Error('Patient not found!');
          err1.status = 404;
          return next(err1);
        }
        return res.status(200).json('Done');
      })
      .catch(e => {
        e.status = 403;
        return next(e);
      });
  }
};
