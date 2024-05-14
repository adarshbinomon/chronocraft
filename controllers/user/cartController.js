const User = require("../../model/userModel");
const Product = require("../../model/productModel");
const Category = require("../../model/categoryModel");
const Order = require("../../model/orderModel");
const Coupon = require("../../model/couponModel");

//load cart ̰

const loadCart = async (req, res) => {
  try {
    const userData = await User.findById(req.session.user_id);
    const userCart = await User.findOne({ _id: req.session.user_id }).populate(
      "cart.productId"
    );
    const coupons = await Coupon.find({ users: { $ne: userData._id } });
    const categories = await Category.find();
    console.log(coupons);
    console.log("coupons");

    // console.log(JSON.stringify(userCart));
    let grandTotal = 0;
    for (let i = 0; i < userCart.cart.length; i++) {
      grandTotal =
        grandTotal +
        parseInt(userCart.cart[i].productId.salePrice) *
          parseInt(userCart.cart[i].quantity);
    }
    // console.log('grandTotal'+grandTotal);
    // console.log(cartItems);
    res.render("cart", {
      userCart: userCart,
      grandTotal: grandTotal,
      userData: userData,
      coupons: coupons,
      categories: categories,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//add to cart

const addToCart = async (req, res) => {
  try {
    console.log(req.body);
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity);
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
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
      // user.cart1.push({productId,quantity})
    }

    await user.save();

    console.log("product added to cart");

    //   res.redirect('/cart')
    res.redirect("/cart");
  } catch (error) {
    console.log(error.message);
  }
};

// change quantity in cart

const changeQuantity = async (req, res) => {
  console.log(req.body);
  req.body.count = parseInt(req.body.count);
  try {
    const data = await User.updateOne(
      {
        _id: req.session.user_id,
        "cart.productId": req.body.productId,
      },
      {
        $inc: {
          "cart.$.quantity": req.body.count,
        },
      },
      {
        new: true,
      }
    );
    console.log("Dataa", data);
  } catch (error) {
    console.log(error.message);
  }
};

//delete cart item
const deleteCartItem = async (req, res) => {
  try {
    const userId = req.session.user_id;
    const productIdToDelete = req.params.id;

    console.log("productId to remove" + productIdToDelete);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("user" + user);
    user.cart = user.cart.filter(
      (item) => !item.productId.equals(productIdToDelete)
    );

    await user.save();

    console.log("Product removed from cart");

    res.redirect("/cart");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//load checkout

const loadCheckout = async (req, res) => {
  try {
    const userData = await User.findById(req.session.user_id);
    const userCart = await User.findOne({ _id: req.session.user_id }).populate(
      "cart.productId"
    );
    const categories = await Category.find();

    // Use async/await to calculate wallet balance
    const walletResult = await User.aggregate([
      {
        $match: { _id: userData._id }, // Match the user by _id
      },
      {
        $unwind: "$wallet", // Unwind the 'wallet' array to work with individual transactions
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$wallet.amount" }, // Calculate the sum of 'amount' values
        },
      },
    ]).exec();

    let walletBalance;

    if (walletResult && walletResult.length > 0) {
      walletBalance = walletResult[0].totalAmount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR", // You can change 'USD' to 'INR' for Indian Rupees
      });
      console.log("Total Amount in Wallet:", walletBalance);
    } else {
      console.log("No wallet transactions found.");
    }

    req.session.returnTo1 = "/checkout";

    console.log("walletout", walletBalance);

    res.render("checkout", {
      user: userData,
      userCart: userCart,
      userData: userData,
      categories: categories,
      walletBalance: walletBalance,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//apply coupon

const applyCoupon = async (req, res) => {
  try {
    const name = req.body.coupon;
    const total = req.body.total;
    console.log(req.body);
    const userData = await User.findById(req.session.user_id);
    const coupon = await Coupon.findOne({
      $and: [{ couponName: name }, { users: { $nin: [req.session.user_id] } }],
    });
    console.log(coupon);
    if (coupon) {
      console.log(coupon.minAmt < total);
      if (parseInt(coupon.minAmt) <= parseInt(total)) {
        console.log("if");
        const discountedAmt = (total * coupon.discount) / 100;
        console.log("discountedAmt");
        console.log(discountedAmt);
        console.log(discountedAmt < coupon.maxDiscount);
        if (discountedAmt < coupon.maxDiscount) {
          var discount = discountedAmt;
        } else {
          var discount = coupon.maxDiscount;
        }
        console.log("discount");
        console.log(discount);
        var newTotal = total - discount;

        console.log("newTotal");
        console.log(newTotal);

        await Coupon.updateOne(
          { couponName: name },
          { $push: { users: userData._id } }
        );
        res.status(200).json({
          success: true,
          coupon: coupon,
          newTotal: newTotal,
          discount: discount,
        });
      } else {
        console.log("big else");
        res.status(200).json({
          success: false,
          message: "coupon cannot be used",
        });
      }
    } else {
      console.log("coupon already used by the user");
      res.status(200).json({
        success: false,
        message: "coupon already used by the user",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadCart,
  addToCart,
  changeQuantity,
  deleteCartItem,
  loadCheckout,
  applyCoupon,
};
