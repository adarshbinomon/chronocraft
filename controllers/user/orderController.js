const User = require('../../model/userModel');
const Product = require('../../model/productModel');
const Category = require('../../model/categoryModel');
const Coupon = require('../../model/couponModel');
const Order = require('../../model/orderModel');
const Razorpay = require("razorpay");
const mongoose = require('mongoose')

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
        const userData = await User.findById(req.session.user_id);
        // const order= await Order.findById(orderId);
        const order = await Order.findOne({_id: orderId}).populate('products.productId')
        console.log('details of 0th product');
        console.log(order.products[0].productId);


        res.render('orderDetails',{
          order: order,
          userData: userData
        })

    } catch (error) {
        console.log(error.message);
    }
}

 //checkout

 const checkout = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.session.user_id;
    const user = await User.findById(req.session.user_id);
    const cart = await User.findById(req.session.user_id, { cart: 1, _id: 0 });
    const coupon = await Coupon.findOne({
      $and: [
        { couponName: req.body.couponName },
        { users: { $nin: [req.session.user_id] } }
      ]
    });

    let discount = 0; 
    let newTotal = req.body.total;
    let total = 0

    if(req.body.couponName){
      console.log('coupon present');
      console.log(coupon);
      if(parseInt(coupon.minAmt)<=parseInt(req.body.total)){
        console.log('if');
        const discountedAmt = req.body.total * coupon.discount / 100 ;
        console.log('discountedAmt');
        console.log(discountedAmt);
        console.log(discountedAmt<coupon.maxDiscount);
        if(discountedAmt<coupon.maxDiscount){
          discount = discountedAmt;
        }else{
          discount = coupon.maxDiscount;
        }
        console.log('coupon.minAmt<total');
        console.log(discount);
        newTotal = req.body.total - discount;

        console.log('newTotal');
        console.log(newTotal);
      }
      
    }
    else if(!req.body.couponName){
      console.log('no coupon used');
    }

    if(newTotal){
      console.log('total if');
      total = newTotal;
    }else{
      console.log('total else');

      total = req.body.total;
    }
    // console.log(cart.cart);
    // console.log(req.body);
    const order = new Order({
      customerId: userId,
      quantity: req.body.quantity,
      price: req.body.salePrice,
      products: cart.cart,
      coupon: req.body.couponName,
      discount: discount,
      totalAmount: total,
      shippingAddress: req.body.address,
      paymentDetails: req.body.payment_option,
    });
    const orderSuccess = await order.save();
    // console.log('order==',order);
    // console.log('order');
    // console.log(order._id);
    const orderId = order._id;
    // console.log(orderSuccess);
    // console.log(orderId);

    
    if (orderSuccess) {
      for (const cartItem of user.cart) {
        const product = await Product.findById(cartItem.productId);
        // console.log('ggggggggggg');
        // console.log(product);

        if (product) {
          product.quantity -= cartItem.quantity;
          await product.save();
          console.log('quantity decreased');
        }
      }

      // Make the cart empty
      await User.updateOne({ _id: userId }, { $unset: { cart: 1 } });

      if (order.paymentDetails === 'COD') {
        res.status(200).json({
          status: true,
          msg: "Order created for COD",
        })
            } else if (req.body.payment_option === "razorpay") {
        console.log('razorpay');

        const amount = req.body.total * 100; // Amount in paise
        const options = {
          amount: amount,
          currency: "INR",
          receipt: orderId,
        };

        // Create a Razorpay order
        razorpay.orders.create(options,(err, order) => {
          if (!err) {
            console.log("Razorpay order created");
            console.log(orderId);

            // Send Razorpay response to the client
            res.status(200).send({
              success: true,
              msg: "Order created",
              order_id: order.id,
              amount: amount,
              reciept: orderId,
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

//verify payment

const verifyPayment = async(req, res) => {
  try {
    console.log('this is id:',req.body.orderId);
    console.log('this is id1:',req.body);
    console.log('this is id2:',req.body.payment);
    const kk = await Order.find({_id : new mongoose.Types.ObjectId(req.body.orderId)}).lean()
    if(kk)
      console.log(kk);
      console.log(req.body.orderId);
      const crypto = require('crypto')
    let hmac = crypto.createHmac('sha256', 'rzp_test_7ETyzh4jBTZxal');
    hmac.update(req.body.payment.razorpay_order_id + "|" + req.body.payment.razorpay_payment_id);
    hmac = hmac.digest('hex');


    if (hmac == req.body.payment.razorpay_signature) {
      console.log('call comes here');
      console.log(typeof(req.body.orderId));
      await Order.updateOne({_id : new mongoose.Types.ObjectId(req.body.orderId)},{$set : { paymentStatus : 'RECEIVED', orderStatus :"PLACED"}}).lean()

      res.status(200).json({ status: 'success', msg: 'Payment verified' });
    } else {

      res.status(400).json({ status: 'error', msg: 'Payment verification failed' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', msg: 'Internal server error' });
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

//order success

const orderSuccess = async (req,res)=>{
  try {
    res.render('successPage')
  } catch (error) {
    console.log(error.message);
  }
}

// return

const returnProduct = async(req,res)=>{
  try {
    console.log(req.body);
    const reason = req.body.reason;
    const id = req.body.id;
    const order = await Order.findById({_id : new mongoose.Types.ObjectId(id)})
    await Order.findByIdAndUpdate({_id : new mongoose.Types.ObjectId(id)}, {$set : {returnReason : reason, orderStatus : "RETURNED"}}).lean()
    
    for (const item of order.products) {
      const product = await Product.findById(item.productId);

      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }
    return res.status(200).json({success: true})
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 'error', msg: 'Cannot return product' });
  }
}


module.exports= {
    loadOrderDetails,
    checkout,
    cancelOrder,
    verifyPayment,
    orderSuccess,
    returnProduct
}