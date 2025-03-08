import bcrypt from 'bcryptjs';
import { uuid, counter } from '../utils/index.js';
import { loadUserCollection } from '../config/db.js';
import validationMessage from '../utils/validationError.js';
import userSchema from '../models/userModels.js';
import { mergeRequestData } from '../utils/mergeRequestData.js';

// Get user list
export const getUsers = async (req, res) => {
  try {
    const usersCollection = await loadUserCollection();
    const users = usersCollection.data.users;
    const sortedUsers = users
      .map(({ password, ...users }) => users)
      .sort((a, b) => a.id - b.id);
    res.status(200).json(sortedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Create user
export const createUser = async (req, res) => {
  try {
    const usersCollection = await loadUserCollection();
    const { firstName, lastName, type, status, password } = mergeRequestData(req);

    const field = { firstName, lastName, type, status };
    const context = { usersCollection };
    const errors = await validationMessage(field, userSchema, context);

    errors && res.status(400).json({
      data: errors,
      metadata: {
        message: 'An error occurred while creating new user.'
      }
    })


    // Check if the user already exists
    const userExist = usersCollection.data.users.find(user => user.firstName === firstName);
    if (userExist) {
      return res.status(400).json({ message: 'User firstname already exists.' });
    }

    // Count existing documents to generate a unique ID
    const user = usersCollection.data;
    const lastUser = counter(user, 'users')
    const userId = lastUser ? lastUser.id + 1 : 1;
    const newUser = {
      uuid,
      id: userId,
      firstName,
      lastName,
      userName: `${firstName}${lastName}`.toLowerCase(),
      type,
      status,
      ...(password ? { password: await bcrypt.hash(password, 10) } : {}),
    };

    // Insert the new user into the database
    usersCollection.data.users.push(newUser);
    await usersCollection.write();
    res.status(201).json({
      data: { user: newUser },
      metadata: { message: 'User created successfully.' },
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error.message || 'An error occurred while processing your request.'
    });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const usersCollection = await loadUserCollection();
    const { uuid } = req.params;
    const { firstName, lastName, type, status } = mergeRequestData(req);
    // Validate input
    if (!firstName || !lastName || !type || !status) {
      return res.status(400).json({ message: 'Please enter all field!' });
    }

    // Find the user by UUID
    const userIndex = usersCollection.data.users.findIndex(user => user.uuid === uuid);
    // Update user fields
    usersCollection.data.users[userIndex] = {
      ...usersCollection.data.users[userIndex], // Preserve other user properties
      firstName,
      lastName,
      userName: `${firstName}${lastName}`.toLowerCase(),
      type,
      status,
    };

    // Save changes
    await usersCollection.write();
    res.status(200).json({
      data: { ...usersCollection.data.users[userIndex], password: undefined }, // Exclude password
      metadata: { message: 'User updated successfully.' },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error while updating user.' });
  }
};