const Category = require('../../model/categoryModel')


//load categories

const loadCategories = async (req,res) =>{
    try {
        const categories = await Category.find();
        req.session.categories = categories;
        res.render('categories',{categories: categories})
    } catch (error) {
        console.log(error.message);
    }
}

// add category

const addCategory = async(req,res)=>{
    try {
        let category = new Category({
            name : req.body.name,
            description : req.body.description,
            isListed : req.body.isListed,
            image : req.file.filename
        })
        console.log(category);
    
        category = await category.save();
    
        if(category){
            res.redirect('/admin/categories')
        }else{
            res.render('categories',{message:'Category adding failed.'},{categories: req.session.categories})
        }
    } catch (error) {
        console.log(error.message);
    }
}

// load edit category

const loadEditCategory = async (req,res) =>{
    try {
        const id = req.params.id;
        Category.findById(id).then((data)=>{
            console.log(id);
            console.log(data);
            res.render('categoryEdit', {data: data} )
        })
        .catch((error)=>{
            console.log(error);
        })
            
    } catch (error) {
        console.log(error.message);
    }
}

//update category

const updateCategory = async (req,res)=>{
    try { 
        console.log(req.body);
        console.log(req.file);
        const id = req.params.id;
        let data; 
        if(req.file){
        data = {
            _id: id,
            name: req.body.name,
            image: req.file.filename,
            isListed: req.body.isListed,
            description: req.body.description
        }}else{
            data = {
                _id: id,
            name: req.body.name,
            isListed: req.body.isListed,
            description: req.body.description
            }
        }
        console.log(data); 
        await Category.findByIdAndUpdate(id,data)

        res.redirect('/admin/categories')

    } catch (error) {
        console.log(error.message);
    }
}

//delete category

const deleteCategory = async(req,res)=>{
    try {
        const id = req.params.id;
        await Category.findByIdAndDelete(id)
        res.redirect('/admin/categories')
    } catch (error) {
        console.log(error.message);
    }
}



module.exports = {
    loadCategories,
    addCategory,
    loadEditCategory,
    updateCategory,
    deleteCategory
}