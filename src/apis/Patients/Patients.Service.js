const Patients = require('../../models/Patients');

class Patient {
  constructor(data) {
    this.data = data;
  }

  async getOnePatient() {
    try {
      const res = await Patients.findOne({
        firstName: this.data.firstName.toLowerCase(),
        lastName: this.data.lastName.toLowerCase()
      });
      return res;
    } catch (e) {
      return e;
    }
  }

  async addPatient() {
    let patient = new Patients({
      firstName: this.data.firstName.toLowerCase(),
      lastName: this.data.lastName.toLowerCase(),
      birthday: this.data.birthday
    });
    try {
      const res = await patient.save();
      return res;
    } catch (e) {
      return e;
    }
  }

  async updatePatient() {
    let update;
    if (this.data.firstName && this.data.lastName) {
      update = {
        firstName: this.data.firstName.toLowerCase(),
        lastName: this.data.lastName.toLowerCase()
      };
    }
    if (this.data.firstName) update = { firstName: this.data.firstName.toLowerCase() };
    if (this.data.lastName) update = { lastName: this.data.lastName.toLowerCase() };
    try {
      const res = await Patients.updateOne(
        {
          _id: this.data.id
        },
        update
      );
      if (res === null) {
        return 'Nothing was updated';
      }
      return true;
    } catch (e) {
      return e;
    }
  }

  async deletePatient() {
    try {
      const res = await Patients.deleteOne({ _id: this.data.id });
      if (res === null) {
        return false;
      }
      return true;
    } catch (e) {
      return e;
    }
  }

  /* eslint-disable class-methods-use-this */
  async getPatients() {
    try {
      const res = await Patients.find();
      return res;
    } catch (e) {
      return e;
    }
  }
}

module.exports = Patient;
