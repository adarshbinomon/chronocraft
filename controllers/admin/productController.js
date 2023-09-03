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
        // console.log(req.files);
        const id = req.params.id;
        console.log('object id');
        console.log(id);
        const fileNamesU = req.files.map(file => file.filename); 
        console.log(fileNamesU);
        const imgImp = req.body.imageImport.split(',')
        const imgArr = [...imgImp,...fileNamesU];
        console.log(imgArr);

        let data; 
        if(req.files.length){
            data = {
                _id: id,
                productName : req.body.productName,
                brandName : req.body.brandName,
                category: req.body.category,
                description: req.body.description, 
                regularPrice: req.body.regularPrice,
                salePrice: req.body.salePrice,
                quantity: req.body.quantity,
                image: imgArr
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

//delete product image

const deleteImage = async (req, res) => {
    const id = req.params.id;
    const img = req.params.img;

    try {
        const updatedDocument = await Product.findOneAndUpdate(
            { _id: id },
            { $pull: { image: img } },
            { new: true }
        );

        if (!updatedDocument) {
            console.log('Document not found');
            return res.status(404).json({ message: 'Document not found' });
        }

        console.log('Element removed successfully');
        res.redirect('/admin/edit-product/'+id)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while deleting the element' });
    }
};


module.exports = {
    loadAddProduct,
    addProduct,
    loadProducts,
    loadEditProduct,
    editProduct,
    deleteProduct,
    deleteImage
}