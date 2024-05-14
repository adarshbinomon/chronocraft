const isLogIn = async (req, res, next) => {
  try {
    if (req.session.admin_id) {
      console.log(req.session.admin_id);
      next();
    } else {
      res.redirect("/admin/login");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const isLogOut = async (req, res, next) => {
  try {
    if (req.session.admin_id) {
      res.redirect("/admin");
    } else {
      next();
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  isLogIn,
  isLogOut,
};
