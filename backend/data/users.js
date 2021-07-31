import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    idAdmin: true,
  },
  {
    name: 'John',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    idAdmin: false,
  },
  {
    name: 'Mike',
    email: 'mike@example.com',
    password: bcrypt.hashSync('123456', 10),
    idAdmin: false,
  },
];

export default users;
