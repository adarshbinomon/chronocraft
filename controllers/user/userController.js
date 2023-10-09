const User = require("../../model/userModel");
const Product = require("../../model/productModel");
const Category = require("../../model/categoryModel");
const Order = require("../../model/orderModel");
const Banner = require("../../model/bannerModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

// password encryption
const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

//generate otp
const generateOtp = () => {
  return Math.floor(Math.random() * 9000 + 1000);
};

//send mail
const sendMail = async (name, email) => {
  try {
    const otp = generateOtp();
    console.log(otp);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: "adarshbinomon.3@gmail.com",
      to: email,
      subject: "OTP || chronocraft",
      text: `Thank you for choosing Chronocraft. Use this otp to finish your signup: ${otp}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent", info.response);
      }
    });

    return otp;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

//load signup
const loadRegister = async (req, res) => {
  try {
    const userData = await User.findById(req.session.user_id);
    const categories = await Category.find();

    res.render("signup", {
      userData: userData,
      categories: categories,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

//add user
const addUser = async (req, res) => {
  try {
    const userDetails = req.body;
    console.log(userDetails);
    const userData = await User.findById(req.session.user_id);
    const categories = await Category.find();

    const existingEmail = await User.findOne({ email: req.body.email });

    if (existingEmail) {
      res.render("signup", {
        message: "email already registered, try logging in.",
        categories: categories,
        userData: userData
      });
    } else {
      if (userDetails) {
        const otp = await sendMail(userDetails.name, userDetails.email);
        req.session.otp = otp;
        res.render("otpVerify", {
          message: `OTP sent to ${userDetails.email}`,
          userDetails,
          userData: userData,
        });
      } else {
        res.render("signup");
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

//otp verify
const verifyOtp = async (req, res) => {
  try {
    const userData = req.body;
    const enteredOtp = req.body.otp;
    console.log(req.session.otp);
    console.log(req.session.resendotp);
    console.log("old" + req.session.id);

    console.log(enteredOtp);

    if (req.session.otp == enteredOtp || req.session.resendotp == enteredOtp) {
      const sPassword = await securePassword(userData.password);
      const user = new User({
        name: userData.name,
        email: userData.email,
        password: sPassword,
        phoneNumber: userData.phoneNumber,
        isAdmin: 0,
      });
      delete req.session.otp;
      const savedUser = await user.save();
      req.session.user_id = user._id;
      req.session.isActive = userData.isActive;
      req.session.user = userData;
      console.log(savedUser);
      res.redirect("/");
    } else {
      res.render("otpVerify", { message: "OTP verification failed" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

//load login

const loadLogin = async (req, res) => {
  try {
    const userData = await User.findById(req.session.user_id);
    const categories = await Category.find();

    res.render("login", {
      userData: userData,
      categories: categories,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

//user login

const userLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userData = await User.findOne({ email: email });
    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);

      if (userData.isActive === false) {
        res.render("login", {
          message:
            "Access to your account is currently  blocked by admin, contact admin for more details",
        });
      } else if (passwordMatch && userData.isAdmin === 0) {
        req.session.user_id = userData._id;
        req.session.isActive = userData.isActive;
        req.session.user = userData;
        console.log(userData);
        console.log(userData.isActive);
        if (req.session.returnTo) {
          res.redirect(req.session.returnTo);
        } else {
          res.redirect("/");
        }
      } else {
        res.render("login", { message: "Email or Password Incorrect" });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

//user logout
const userLogOut = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
};

//load home
const loadHome = async (req, res) => {
  try {
    const categories = await Category.find({ isListed: true });
    const products = await Product.find({ isListed: true });
    const banners = await Banner.find({ isListed: true });
    const userData = await User.findById(req.session.user_id);
    res.render("home", {
      categories: categories,
      products: products,
      userData: userData,
      banners: banners,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//load product page
const loadProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User.findById(req.session.user_id);
    const product = await Product.findById(id);
    const categories = await Category.find();
    console.log("try");
    if (product) {
      console.log("if");
      res.render("productDetails", {
        product: product,
        userData: userData,
        categories: categories,
      });
    } else {
      console.log("else");
      res.redirect("/error");
    }
  } catch (error) {
    console.log(error.message);
  }
};

//load category specific products
const loadCategory = async (req, res) => {
  try {
    const userData = await User.findById(req.session.user_id);
    const id = req.params.id;

    var page = 1;
    if (req.query.page) {
      page = req.query.page;
    }
    const limit = 2;

    const category = await Category.findById(id);
    const products = await Product.find({ category: category.name })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const categories = await Category.find();

    const count = await Product.find({
      category: category.name,
    }).countDocuments();

    console.log(products);
    res.render("categoryFind", {
      products: products,
      userData: userData,
      totalPages: Math.ceil(count / limit),
      page: page,
      categories: categories,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//load user account page
const loadaccount = async (req, res) => {
  try {
    if (req.query.orderSearch) {
      req.session.orderSearch = req.query.orderSearch;
    }
    let search = req.session.orderSearch;

    var page = 1;
    if (req.query.page) {
      page = req.query.page;
    }
    const limit = 15;
    const count = await Order.find({
      customerId: req.session.user_id,
    }).countDocuments();

    const orderData = Order.find({ customerId: req.session.user_id }).sort({
      createdAt: -1,
    });
    const orders = await paginateQuery(orderData, page, limit).exec();

    const userData = await User.findById(req.session.user_id);
    const categories = await Category.find();

    const walletResult = await User.aggregate([
      {
        $match: { _id: userData._id },
      },
      {
        $unwind: "$wallet",
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$wallet.amount" },
        },
      },
    ]).exec();

    let walletBalance;

    if (walletResult && walletResult.length > 0) {
      walletBalance = walletResult[0].totalAmount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
      console.log("Total Amount in Wallet:", walletBalance);
    } else {
      console.log("No wallet transactions found.");
    }

    // console.log(userData.address[0].city);

    res.render("userAccount", {
      userData: userData,
      orders: orders,
      categories: categories,
      totalPages: Math.ceil(count / limit),
      count: count,
      page: page,
      limit: limit,
      search: search,
      walletBalance: walletBalance,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// load edit address
const loadEditAddress = async (req, res) => {
  try {
    const addressIndex = req.params.id;
    const userData = await User.findById(req.session.user_id);
    const categories = await Category.find();

    const user = req.session.user;
    const address = user.address[addressIndex];
    console.log("edit address details");
    console.log(address);
    res.render("editAddress", {
      address: address,
      addressIndex: addressIndex,
      userData: userData,
      categories: categories,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// edit address

const editAddress = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findById(req.session.user_id);
    const addressId = req.body.addressId;
    console.log(addressId);

    // Use findOneAndUpdate to update the specific address
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user._id,
        "address._id": addressId,
      },
      {
        $set: {
          "address.$.name": req.body.name,
          "address.$.addressLine1": req.body.addressLine1,
          "address.$.addressLine2": req.body.addressLine2,
          "address.$.city": req.body.city,
          "address.$.state": req.body.state,
          "address.$.pinCode": req.body.pinCode,
          "address.$.phone": req.body.phone,
          "address.$.email": req.body.email,
          "address.$.addressType": req.body.addressType,
        },
      },
      { new: true } // To return the updated user document
    );

    if (updatedUser) {
      console.log("User address updated:", updatedUser);
      res.redirect("/account");
    } else {
      console.log("Address not found or user not found.");
    }
  } catch (error) {
    console.log(error.message);
  }
};

// load add address
const loadAddAddress = async (req, res) => {
  try {
    const userData = await User.findById(req.session.user_id);
    const categories = await Category.find();

    res.render("addAddress", {
      userData: userData,
      categories: categories,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//add address
const addAddress = async (req, res) => {
  try {
    const address = {
      name: req.body.name,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      city: req.body.city,
      state: req.body.state,
      pinCode: req.body.pinCode,
      phone: req.body.phone,
      email: req.body.email,
      addressType: req.body.addressType,
    };
    // console.log('ADDADDRESS- address:');
    console.log(address);
    const user = await User.findById(req.session.user_id);
    // console.log('ADDADDRESS- user:'+user);

    user.address.push(address);
    await user.save();

    if (req.session.returnTo1) {
      res.redirect(req.session.returnTo1);
    } else {
      res.redirect("account");
    }
  } catch (error) {
    console.log(error.message);
  }
};

//reset password

const resetPassword = async (req, res) => {
  try {
    const password = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const user = await User.findById(req.session.user_id);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const sPassword = await securePassword(newPassword);

      await User.updateOne(
        { _id: req.session.user_id },
        { password: sPassword }
      );
      res.status(200).json({ success: true });
    } else {
      console.log("wrong password");
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//load about

const loadAbout = async (req, res) => {
  try {
    const userData = await User.findById(req.session.user_id);
    const categories = await Category.find();

    res.render("about", {
      userData: userData,
      categories: categories,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//search

const searchResult = async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.findById(req.session.user_id);
    const categories = await Category.find();

    const search = req.body.search;

    var page = 1;
    if (req.query.page) {
      page = req.query.page;
    }
    const limit = 3;

    const result = await Product.find({
      $or: [
        { productName: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Product.find({
      $or: [
        { productName: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    }).countDocuments();
    console.log(count);
    console.log(Math.ceil(count / limit));
    console.log(page);

    console.log(result);
    res.render("categoryFind", {
      products: result,
      userData: userData,
      totalPages: Math.ceil(count / limit),
      page: page,
      categories: categories,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//resend otp

const resendOtp = async (req, res) => {
  try {
    console.log(req.body);
    const userData = req.body;
    const resentOtp = await sendMail(userData.name, userData.email);
    console.log("old" + req.session.otp);
    console.log("old" + req.session.id);
    req.session.otp = resentOtp;
    req.session.save();
    console.log(req.session.otp);
    console.log(resentOtp);
  } catch (error) {
    console.log(error.message);
  }
};

//load contact

const loadContact = async (req, res) => {
  try {
    const userData = await User.findById(req.session.user_id);

    res.render("contact", { userData: userData });
  } catch (error) {
    console.log(error.message);
  }
};

//load error

const error = async (req, res) => {
  try {
    res.render("errorPage");
  } catch (error) {
    console.log(error.message);
  }
};

//order search in use account

function paginateQuery(query, page, limit) {
  try {
    const skip = (page - 1) * limit;
    return query.skip(skip).limit(limit);
  } catch (error) {
    console.error("Error in paginateQuery:", error);
    throw error;
  }
}

//order search

const orderSearch = async (req, res) => {
  try {
    if (req.query.orderSearch) {
      req.session.orderSearch = req.query.orderSearch;
    }
    let search = req.session.orderSearch;

    console.log("search:", search);

    console.log("vxcvcxvxxzcbzzzzzzzz" + search);
    var page = 1;
    if (req.query.page) {
      page = req.query.page;
    }
    const limit = 5;
    const orderData = Order.find({
      customerId: req.session.user_id,
      orderId: { $regex: new RegExp(search, "i") },
    });

    const count = await Order.countDocuments({
      customerId: req.session.user_id,
      orderId: { $regex: new RegExp(search, "i") },
    });
    console.log("orderDataaaaaa" + orderData);

    const orders = await paginateQuery(orderData, page, limit).exec();

    const userData = await User.findById(req.session.user_id);
    const categories = await Category.find();
    res.render("userProfile", {
      userData: userData,
      orders: orders,
      categories: categories,
      totalPages: Math.ceil(count / limit),
      count: count,
      page: page,
      limit: limit,
      search: search,
    });
  } catch (error) {
    console.error(error);
  }
};

// wishlist

const loadWishlist = async (req, res) => {
  try {
    const userData = await User.findById(req.session.user_id).populate(
      "wishlist.productId"
    );
    console.log(userData);
    const categories = await Category.find();

    res.render("wishlist", {
      userData: userData,
      categories: categories,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// add to wishlist

const addToWishlist = async (req, res) => {
  try {
    console.log("wishlist");
    const productId = req.body.productId;
    console.log();

    const userId = req.session.user_id;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const existingItem = user.wishlist.find((item) =>
      item.productId.equals(productId)
    );

    if (existingItem) {
      res.status(200).json({
        success: false,
        message: "product already in wishlist",
      });
    } else {
      user.wishlist.push({ productId });
      await user.save();
      res.status(200).json({
        success: true,
        message: "product added to wishlist",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// add to cart from wishlist

const addToCartFromWishlist = async (req, res) => {
  try {
    console.log(req.body);
    const productId = req.body.productId;
    const quantity = 1;
    console.log(
      "ADDTOCART productId-----" + productId + "   quantity-----" + quantity
    );

    if (isNaN(quantity) || quantity <= 0) {
      res.status(400).json({ message: "Invalid quantity" });
    }

    const userId = req.session.user_id;
    console.log("ADDTOCART userId------" + userId);
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "user not found" });
    }

    const existingItem = user.cart.find((item) =>
      item.productId.equals(productId)
    );

    if (existingItem) {
      res.status(200).json({
        success: false,
        message: "item already in cart",
      });
    } else {
      user.cart.push({ productId, quantity });
      user.wishlist.pull({ productId });
    }

    await user.save();
    console.log(user);

    console.log("product added to cart");

    //   res.redirect('/cart')
    res.status(200).json({
      success: true,
      message: "item added to cart",
    });
  } catch (error) {
    console.log(error.message);
  }
};

//delete wishlist item

const deleteWishlistItem = async (req, res) => {
  try {
    const userId = req.session.user_id;
    const productIdToDelete = req.body.productId;

    console.log("productId to remove" + productIdToDelete);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("user" + user);
    user.wishlist = user.wishlist.filter(
      (item) => !item.productId.equals(productIdToDelete)
    );

    await user.save();

    console.log("Product removed from wishlist");

    res.status(200).json({
      success: true,
      message: "item removed successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  loadRegister,
  addUser,
  verifyOtp,
  loadLogin,
  userLogin,
  userLogOut,
  loadHome,
  loadProduct,
  loadCategory,
  loadaccount,
  loadEditAddress,
  editAddress,
  loadAddAddress,
  addAddress,
  loadAbout,
  resetPassword,
  searchResult,
  resendOtp,
  loadContact,
  error,
  orderSearch,
  loadWishlist,
  addToWishlist,
  addToCartFromWishlist,
  deleteWishlistItem,
};
