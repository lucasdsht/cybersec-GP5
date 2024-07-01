const { PrismaClient } = require('@prisma/client');
const client = new PrismaClient();

const login = async (req, res) => {
  // ...
  console.log('Login route');
  const reqMail = req.body.email;
  const reqPass = req.body.password;
  const user = await client.user.findUnique({
    where: {
      email: reqMail,
      password: reqPass
    },
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // want to returnm an access token
  return res.status(200).json(user);

}

const register = async (req, res) => {
  // ...
  console.log('Register route');
  // register via username mail password
  const reqMail = req.body.email;
  const reqPass = req.body.password;
  const reqUser = req.body.username;
  const user = await client.user.create({
    data: {
      email: reqMail,
      password: reqPass,
      name: reqUser
    },
  });

  return res.status(201).json(user);
}

module.exports = {
  login,
  register
};

