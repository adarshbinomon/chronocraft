const User = require('../../model/userModel');
const Product = require('../../model/productModel');
const Category = require('../../model/categoryModel');

//load cart

const loadCart = async (req,res)=>{
    try {
        const userCart = await User.findOne({_id: req.session.user_id}).populate('cart.productId')
        // console.log(JSON.stringify(userCart));
        const cartItems = userCart.items;
        // console.log(cartItems);
        res.render('cart',{userCart: userCart})
    } catch (error) {
        console.log(error.message);
    }
}

//add to cart

const addToCart = async (req,res)=>{
    try {
        console.log(req.body);
        const productId = req.body.productId;
        const quantity = parseInt(req.body.quantity);
        console.log('productId-----'+productId+'   quantity-----' + quantity);

        if(isNaN(quantity) || quantity <= 0){
            res.status(400).json({ message: 'Invalid quantity' });
        }
        
        const userId = req.session.user_id;
        console.log('userId------'+userId);
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
        res.redirect('/product/'+productId);
    } catch (error) {
        console.log(error.message);
    }
}

// change quantity in cart

const changeQuantity = async (req,res)=>{
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

module.exports = {
    loadCart,
    addToCart,
    changeQuantity
}