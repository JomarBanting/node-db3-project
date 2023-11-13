/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const db = require("../../data/db-config");

const checkSchemeId = async (req, res, next) => {
  const result = await db("schemes")
    .where("schemes.scheme_id", req.params.scheme_id).first();

  if (result) {
    next();
  } else {
    next({
      status: 404,
      message: `scheme with scheme_id ${req.params.scheme_id} not found`
    })
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const scheme = req.body;
  if (typeof scheme.scheme_name !== "string" || !scheme.scheme_name.trim() || scheme.scheme_name === "undefined") {
    next({
      status: 400,
      message: "invalid scheme_name"
    })
  } else {
    next();
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const scheme = req.body;
  if (
    scheme.instructions === undefined ||
    typeof scheme.instructions !== "string" ||
    !scheme.instructions.trim() ||
    typeof scheme.step_number !== "number" ||
    scheme.step_number < 1
  ) {
    next({
      status: 400,
      message: "invalid step"
    })
  } else {
    next();
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
