import bcrypt from 'bcryptjs';

const authSchema = {
  email: {
    type: String,
    required: true,
    message: 'Username is required.',
    validate: {
      custom: (value, { usersCollection }) => {
        const user = usersCollection.data.users.find(user => user.email === value);
        return user ? { valid: true } : { valid: false, message: 'User does not exist.' };
      },
    },
  },
  password: {
    type: String,
    required: true,
    message: 'Password is required',
    validate: {
      custom: async (value, { usersCollection, email }) => {
        const user = usersCollection.data.users.find(user => user.email === email);
        const isPassword = await bcrypt.compare(value, user.password);
        return isPassword
          ? { valid: true }
          : { valid: false, message: 'Incorrect password.' };
      },
    },
  },
};

export default authSchema;
