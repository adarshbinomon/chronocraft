const User = require('../../model/userModel');
const Product = require('../../model/productModel');
const Category = require('../../model/categoryModel');
const Order = require('../../model/orderModel');
const Coupon = require('../../model/couponModel');

//load coupons page

const loadCoupon = async (req,res)=>{
    try {
        const coupons = await Coupon.find();
        res.render('coupons',{
            coupons: coupons
        })
    } catch (error) {
        console.log(error.message);
    }
}

//load add coupon

const loadAddCoupon = async(req,res)=>{
    try {
        res.render('addCoupons')
    } catch (error) {
        console.log(error.message);
    }
}

//add coupon

const addCoupon = async(req,res)=>{
    try {
        console.log(req.body);
        let coupon = new Coupon({
            couponName: req.body.couponName,
            discount: req.body.discount,
            isListed: req.body.isListed,
            minAmt: req.body.minAmt,
            maxDiscount: req.body.maxDiscount
        })

        console.log(coupon);

        coupon = await coupon.save();

        res.redirect('/admin/coupons')

    } catch (error) {
        console.log(error.message);
    }
}

//edit coupom

const editCoupon = async(req,res)=>{
    try {
        const id = req.params.id;
        const coupon = await Coupon.findById(id);

        res.render('editCoupon',{
            coupon: coupon
        })
    } catch (error) {
        console.log(error.message);
    }
}

//list or unlinst coupon / change status

const changeStatusCoupon = async (req,res)=>{
    try {
        const id = req.params.id;
        console.log(id);
        let unlist = {
            isListed : false
        }
        let list = {
            isListed : true
        }
        const coupon = await Coupon.findById(id);
        if(coupon.isListed==='true'){   
            await Coupon.findByIdAndUpdate(id,unlist)
        }else{
            await Coupon.findByIdAndUpdate(id,list)
        }
        res.redirect('/admin/coupons')
    } catch (error) {
        
    }
}



module.exports = {
    loadCoupon,
    loadAddCoupon,
    addCoupon,
    editCoupon,
    changeStatusCoupon
}