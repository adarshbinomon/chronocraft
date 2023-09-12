const User = require('../../model/userModel');
const Product = require('../../model/productModel');
const Category = require('../../model/categoryModel');
const Order = require('../../model/orderModel');
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id: 'process.env.key_id',
    key_secret: 'process.env.key_secret'
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
      const cart = await User.findById(req.session.user_id,{cart:1,_id:0})
      console.log(cart.cart);
      console.log(req.body);
      const order = new Order({
        customerId: userId,
        quantity: req.body.quantity,
        price: req.body.salePrice,
        products: cart.cart,
        totalAmount: req.body.total,
        shippingAddress: req.body.address,
        paymentDetails: req.body.payment_option
      });
      const orderSuccess = await order.save();
      if(orderSuccess) {
        for (const cartItem of user.cart) {
          const product = await Product.findById(cartItem.productId);
  
          if (product) {
            product.quantity -= cartItem.quantity;
            await product.save();
          }
        }
        if(order.paymentDetails === 'COD'){
          res.render('successPage')
        }else{
          
        }
      }
      console.log(req.body);
    } catch (error) {
      console.log(error.message);
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