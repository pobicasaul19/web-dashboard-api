const userSchema = {
  firstName: {
    type: String,
    required: true,
    message: 'Please add your firstname',
    validate: {
      custom: (value, { usersCollection }) => {
        const userInfo = usersCollection.data.users.some(user => user.firstName === value);
        return userInfo ? { valid: false, message: 'Firstname is taken.' } : { valid: true };
      },
    },
  },
  lastName: {
    type: String,
    required: true,
    message: 'Please add your lastname'
  },
  type: {
    type: String,
    required: true,
    message: 'Please select the type.'
  },
  status: {
    type: String,
    required: true,
    message: 'Please specify the status (Active or Inactive)',
  },
}

export default userSchema;
