import passwordValidator from 'password-validator'

const validatePassword = (password) => {
  const schema = new passwordValidator()

  if (!schema.is().min(8).validate(password)) {
    throw new Error('Password must be minimum of 8 characters')
  }

  if (!schema.is().max(100).validate(password)) {
    throw new Error('Password must be maximum of 24 characters')
  }

  if (!schema.has().lowercase().validate(password)) {
    throw new Error('Password must have at least one lowercase letter')
  }

  if (!schema.has().uppercase().validate(password)) {
    throw new Error('Password must have at least one uppercase letter')
  }

  if (!schema.has().digits().validate(password)) {
    throw new Error('Password must have at least one digit')
  }

  if (!schema.has().symbols().validate(password)) {
    throw new Error('Password must have at least one special character')
  }

  if (!schema.has().not().spaces().validate(password)) {
    throw new Error('Password should not contain spaces')
  }

  return true
}

export default validatePassword