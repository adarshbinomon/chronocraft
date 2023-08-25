const Category = require('../../model/categoryModel')


//load categories

const loadCategories = async (req,res) =>{
    try {
        res.render('categories')
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
            res.render('categories',{message: 'Category successfully added'})
        }else{
            res.render('categories',{message:'Category adding failed.'})
        }
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    loadCategories,
    addCategory
}