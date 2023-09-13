const User = require('../../model/userModel');
const Product = require('../../model/productModel');
const Category = require('../../model/categoryModel');
const Order = require('../../model/orderModel');
const Razorpay = require("razorpay");

// const razorpay = new Razorpay({
//     key_id: 'process.env.key_id',
//     key_secret: 'process.env.key_secret'
// });
const razorpay = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret
});




//load order details page

const loadOrderDetails = async (req,res)=>{
    try {
        const orderId = req.params.id;
        // const order= await Order.findById(orderId);
        const order = await Order.findOne({_id: orderId}).populate('products.productId')
        console.log('details of 0th product');
        console.log(order.products[0].productId);


        res.render('orderDetails',{order: order})

    } catch (error) {
        console.log(error.message);
    }
}

 //checkout

 const checkout = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.session.user_id;
    const user = await User.findById(userId);
    const cart = await User.findById(req.session.user_id, { cart: 1, _id: 0 });
    console.log(cart.cart);
    console.log(req.body);
    const order = new Order({
      customerId: userId,
      quantity: req.body.quantity,
      price: req.body.salePrice,
      products: cart.cart,
      totalAmount: req.body.total,
      shippingAddress: req.body.address,
      paymentDetails: req.body.payment_option,
    });

    const orderSuccess = await order.save();
    
    if (orderSuccess) {
      for (const cartItem of user.cart) {
        const product = await Product.findById(cartItem.productId);

        if (product) {
          product.quantity -= cartItem.quantity;
          await product.save();
        }
      }

      // Make the cart empty
      // await User.updateOne({ _id: userId }, { $unset: { cart: 1 } });

      if (order.paymentDetails === 'COD') {
        res.render('successPage');
      } else if (req.body.payment_option === "razorpay") {
        console.log('razorpay');

        const amount = req.body.total * 100; // Amount in paise
        const options = {
          amount: amount,
          currency: "INR",
          receipt: order._id,
        };

        // Create a Razorpay order
        razorpay.orders.create(options,(err, order) => {
          if (!err) {
            console.log("Razorpay order created");

            // Send Razorpay response to the client
            res.status(200).send({
              success: true,
              msg: "Order created",
              order_id: order.id,
              amount: amount,
              key_id: 'rzp_test_7ETyzh4jBTZxal',
              contact: "9876543210",
              name: "admin",
              email: "admin@gmail.com",
            });
          } else {
            console.error("Razorpay order creation failed:", err);
            res.status(400).send({ success: false, msg: "Something went wrong!" });
          }
        });
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};




// cancel order

const cancelOrder = async (req,res)=>{
    try {
        const id = req.params.id;
        const update = {
            orderStatus : 'CANCELLED'
        }
        const order = await Order.findByIdAndUpdate(id,update);

        res.redirect('/account')
    } catch (error) {
        console.log(error.message);
    }
}


module.exports= {
    loadOrderDetails,
    checkout,
    cancelOrder
}