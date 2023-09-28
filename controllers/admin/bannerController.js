const Banner = require('../../model/bannerModel')



//load bannerpage

const loadBanners = async (req,res) => {
    try {
        const banners = await Banner.find();
        console.log(banners);
        res.render('banners',{
            banners: banners
        })
    } catch (error) {
        console.log(error.message);
    }
} 

//load add banner

const loadAddBanner = async (req,res) => {
    res.render ('addBanner')
}

// add banner

const addBanner = async (req,res) => {
    try {
        console.log('addbanner');
        // console.log(req.file.filename);

        let banner = new Banner({
            name: req.body.name,
            isListed: req.body.isListed,
            description: req.body.description,
            expiry: req.body.date,
            image: req.file.filename,
            link: req.body.link
        })

        console.log(banner);

        banner = await banner.save();

        res.redirect('/admin/banners')
    } catch (error) {
        console.log(error.message);
    }
}



module.exports = {
    loadBanners,
    loadAddBanner,
    addBanner

}