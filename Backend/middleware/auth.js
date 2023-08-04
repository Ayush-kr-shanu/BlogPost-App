const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Get the token from the "token" cookie

    if (!token) {
      return res.status(401).send({ msg: "Login again, session expired" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_CODE);
    const { userId } = decodedToken;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).send({ msg: "Unauthorized" });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).send({ msg: "Unauthorized" });
  }
};

module.exports = {
  authenticate,
};
