const Product = require('../../model/productModel')
const Category = require('../../model/categoryModel')


//load add product

const loadAddProduct = async(req,res)=>{
    try {
        const category = await Category.find();
        res.render('addProduct',{category: category})
    } catch (error) {
        console.log(error.message);
    }
}


//load products

const loadProducts = async (req,res)=>{
    try {
        const products = await Product.find().lean();
        res.render('products',{products: products})
    } catch (error) {
        console.log(error.message);
    }
}

// add product
const addProduct = async (req,res)=>{
    try {
        console.log(req.body);
        const fileNames = req.files.map(file => file.filename); 
        console.log(fileNames);      
        let product = new Product({
            productName : req.body.productName,
            brandName : req.body.brandName,
            category: req.body.category,
            description: req.body.description,
            regularPrice: req.body.regularPrice,
            salePrice: req.body.salePrice,
            quantity: req.body.quantity,
            image: fileNames
            })


            console.log(product);

            product = await product.save();

            res.redirect('/admin/products')
        
    } catch (error) {
        console.log(error.message);
    }
}

//load edit product
const loadEditProduct = async (req,res)=>{
    try {
        const id = req.params.id;
        const category = await Category.find();
        Product.findById(id).then((data)=>{
            console.log(id);
            console.log(data);
            res.render('editProduct', { data: data, category: category });
        })
    } catch (error) {
        console.log(error.message);
    }
}

//edit product

const editProduct = async (req,res)=>{
    try {
        console.log(req.body);
        console.log(req.files);
        const id = req.params.id;
        console.log('object id');
        console.log(id);
        const fileNames = req.files.map(file => file.filename); 
        console.log(fileNames);

        let data; 
        if(req.files){
            data = {
                _id: id,
                productName : req.body.productName,
                brandName : req.body.brandName,
                category: req.body.category,
                description: req.body.description, 
                regularPrice: req.body.regularPrice,
                salePrice: req.body.salePrice,
                quantity: req.body.quantity,
                image: fileNames
        }}else{
            data = {
                _id: id,
                productName : req.body.productName,
                brandName : req.body.brandName,
                category: req.body.category,
                description: req.body.description,
                regularPrice: req.body.regularPrice,
                salePrice: req.body.salePrice,
                quantity: req.body.quantity
            }
        }
        console.log(data); 
        await Product.findByIdAndUpdate(id,data)

        res.redirect('/admin/products')

    } catch (error) {
        console.log(error.message);
    }
}

//delete product

const deleteProduct = async(req,res)=>{
    try {
        const id = req.params.id;
        console.log(id);
        await Product.findByIdAndDelete(id)
        res.redirect('/admin/products')
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    loadAddProduct,
    addProduct,
    loadProducts,
    loadEditProduct,
    editProduct,
    deleteProduct
}