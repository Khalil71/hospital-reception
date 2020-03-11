let valid = {
  displayName: /[a-zA-Z]{1,20}$/,
  uuid: /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/,
  birthday: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
  validate: (param, name, type) => {
    let err;
    if (!param || !valid[type].test(param)) {
      err = new Error(`valid ${name} required!`);
      err.status = 403;
    }
    return err;
  }
};

module.exports = valid;
