const Order = require('../../model/orderModel')
const User = require('../../model/userModel')
const Product = require('../../model/productModel')

//load orders

const loadOrders = async (req,res)=>{
    try {
        const orders = await Order.find().populate('customerId')
        res.render('orders',{orders: orders})
    } catch (error) {
        console.log(error.message);
    }
}

//load order details

const loadOrderDetails = async (req,res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate('customerId')
        const product = await Order.findById(orderId).populate('products.productId')

        res.render('orderDetails',{order: order, product: product})
        
    } catch (error) {
        console.log(error.message);
    }
}

//change order status

const changeStatus = async (req, res) => {
    try {
        console.log(req.body.status);
        const id = req.body.id;
        console.log(id);
        const order = await Order.findById(id);
        await Order.findByIdAndUpdate(id, { orderStatus: req.body.status });
        if(req.body.status === "DELIVERED"){
            await Order.findByIdAndUpdate(id, { deliveredOn: new Date() });
        }else if(req.body.status === "CANCELLED"){
            if (order) {
                for (const orderItem of order.products) {
                  const product = await Product.findById(orderItem.productId);
          
                  if (product) {
                    product.quantity += orderItem.quantity;
                    await product.save();
                    console.log("quantity increased");
                  }
                }
              }
        }
        res.redirect(`/admin/order-details/${id}`);
    } catch (error) {
        console.log(error.message);
    }
};


module.exports = {
    loadOrders,
    loadOrderDetails,
    changeStatus
}