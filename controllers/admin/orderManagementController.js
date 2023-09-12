const Order = require('../../model/orderModel')


const loadOrders = async (req,res)=>{
    try {
        const orders = await Order.find();
        res.render('orders',{orders: orders})
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loadOrders
}