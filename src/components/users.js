// Utility functions for user management
const initialUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    favorites: []
  }
];

// Initialize users in localStorage
export const initializeUsers = () => {
  if (!localStorage.getItem('libraryUsers')) {
    localStorage.setItem('libraryUsers', JSON.stringify(initialUsers));
  }
};

// Get all users
export const getUsers = () => {
  return JSON.parse(localStorage.getItem('libraryUsers')) || [];
};

// Find user by email (case-insensitive)
export const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find(user => 
    user.email.toLowerCase() === email.toLowerCase()
  );
};

// Add new user
export const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('libraryUsers', JSON.stringify(users));
};