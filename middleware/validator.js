const { body, validationResult } = require('express-validator')
const userValidationRules = () => {
  return [
    body('name').isLength({ min: 4}),
    body('screenSize').isLength({ min: 2 }),
    body('cpuType').isLength({ min: 5 }),
    body('memory').isLength({ min: 3 }),
    body('storage').isLength({ min: 3 }),
    body('resolution').isLength({ min: 5 }),
    body('price').isLength({ min: 4 }),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
}