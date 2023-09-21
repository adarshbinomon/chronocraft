const User = require('../../model/userModel');
const Product = require('../../model/productModel');
const Category = require('../../model/categoryModel');
const Order = require('../../model/orderModel');
const Coupon = require('../../model/couponModel');

//load cart

const loadCart = async (req,res)=>{
    try {
        const userData = await User.findById(req.session.user_id);
        const userCart = await User.findOne({_id: req.session.user_id}).populate('cart.productId')
        const coupons = await Coupon.find({ users: { $ne: userData._id } });
        console.log(coupons);
        console.log('coupons');

        // console.log(JSON.stringify(userCart));
        let grandTotal=0;
        for(let i =0;i<userCart.cart.length;i++){
            grandTotal= grandTotal + parseInt(userCart.cart[i].productId.salePrice)* parseInt(userCart.cart[i].quantity)
        }
        // console.log('grandTotal'+grandTotal);
        // console.log(cartItems);
        res.render('cart',{
          userCart: userCart,
          grandTotal: grandTotal,
          userData: userData,
          coupons: coupons
        })
    } catch (error) {
        console.log(error.message);
    }
}

//add to cart

const addToCart = async (req,res) => {
    try {
        console.log(req.body);
        const productId = req.body.productId;
        const quantity = parseInt(req.body.quantity);
        console.log('ADDTOCART productId-----'+productId+'   quantity-----' + quantity);

        if(isNaN(quantity) || quantity <= 0){
            res.status(400).json({ message: 'Invalid quantity' });
        }
        
        const userId = req.session.user_id;
        console.log('ADDTOCART userId------'+userId);
        const user = await User.findById(userId);

        if(!user){
            res.status(404).json({message: 'user not found'})
        }

        const existingItem = user.cart.find((item) => (
            item.productId.equals(productId)
          ));
      
        if (existingItem) {
            existingItem.quantity += quantity;
          } else {
            user.cart.push({ productId, quantity });
            // user.cart1.push({productId,quantity})
          }
      
          await user.save();

          console.log('product added to cart')

        //   res.redirect('/cart')
        res.redirect('/cart');
    } catch (error) {
        console.log(error.message);
    }
}

// change quantity in cart

const changeQuantity = async (req,res) => {
    console.log(req.body)
    req.body.count = parseInt(req.body.count)
    try {
        const data = await User.updateOne(
            {
              _id: req.session.user_id,
               'cart.productId': req.body.productId,
            },
            {
              $inc: {
                'cart.$.quantity': req.body.count,
              }
            },
            {
                new:true
            }
        )
        console.log("Dataa", data)
    } catch (error) {
        console.log(error.message);
    }
}

//delete cart item
const deleteCartItem = async (req, res) => {
    try {
      const userId = req.session.user_id;
      const productIdToDelete = req.params.id; 
  
      console.log('productId to remove'+productIdToDelete);
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      console.log('user'+user);
      user.cart = user.cart.filter((item) =>
        !item.productId.equals(productIdToDelete)
      );
  
      await user.save();
  
      console.log("Product removed from cart");
  
      res.redirect('/cart')
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  //load checkout

  const loadCheckout = async (req,res) => {
   try {
    const userData = await User.findById(req.session.user_id);
    const userCart = await User.findOne({_id: req.session.user_id}).populate('cart.productId')


    // console.log(user);
    console.log(userCart);

    req.session.returnTo1 = '/checkout'

    res.render('checkout',{
      user: userData,
      userCart: userCart,
      userData: userData
    })
   
  } catch (error) {
    console.log(error.message);  
   }
  }

  //apply coupon

  const applyCoupon= async (req,res) => {
    try {
      name = req.body.coupon
      console.log(req.body.coupon);
      const userData = await User.findById(req.session.user_id)
      const coupon = await Coupon.find({couponName: name, users: { $ne: userData._id } });

      if(coupon.length>0){
        res.status(200).json({
          success: true,
          coupon: coupon
        })
      }else{
        res.status(200).json({
          success: false
        });

      }

      console.log(coupon);
    } catch (error) {
      console.log(error.message);
    }
  }

 
module.exports = {
    loadCart,
    addToCart,
    changeQuantity,
    deleteCartItem,
    loadCheckout,
    applyCoupon

}