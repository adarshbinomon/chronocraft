const Order = require('../../model/orderModel')
const User = require('../../model/userModel')

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
        await Order.findByIdAndUpdate(id, { orderStatus: req.body.status });
        if(req.body.status === "DELIVERED"){
            await Order.findByIdAndUpdate(id, { deliveredOn: new Date() });
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