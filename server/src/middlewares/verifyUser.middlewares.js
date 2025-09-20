
const isBlocked = (req, res, next) => {
  if (req.user.isBlocked) {
    return res.status(403).json({ success: false, message: "User is blocked" });
  }
  next();
};

export { isBlocked };