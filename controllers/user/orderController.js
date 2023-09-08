const User = require('../../model/userModel');
const Product = require('../../model/productModel');
const Category = require('../../model/categoryModel');
const Order = require('../../model/orderModel');



//load order details page

const loadOrderDetails = async (req,res)=>{
    try {
        const orderId = req.params.id;
        const order= await Order.findById(orderId);

        res.render('orderDetails',{order: order})

    } catch (error) {
        console.log(error.message);
    }
}


module.exports= {
    loadOrderDetails
}