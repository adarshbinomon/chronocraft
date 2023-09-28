const bcrypt = require('bcrypt');
const User = require('../../model/userModel');
const Order = require('../../model/orderModel');
const Product = require('../../model/productModel');
const Category = require('../../model/categoryModel');
const moment = require('moment')





//load login

const loadLogin = async(req,res)=>{
    try {
        res.render('adminLogin')
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
}

//admin login

const adminLogin = async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

    const adminData = await User.findOne({email: email})
    if(adminData){
        const passwordMatch = await bcrypt.compare(password,adminData.password)
        if(passwordMatch && adminData.isAdmin==1){
            req.session.admin_id = adminData._id;
            console.log(adminData);
            res.redirect('/admin')
            console.log(req.session);
        }else{
            res.render('adminLogin', {message: "email or password incorrect"})

        }
    }else{
        res.render('adminLogin', {message: "email or password incorrect"})

    }
        
    } catch (error) {
        console.log(error.message);
    }
    
}
//load home

const loadDashboard = async(req,res)=>{
    try {
        const adminData = await User.findById({_id:req.session.admin_id})
       //revenue for display
        const revenue = await Order.aggregate([
            {
              $group: {
                _id: null, 
                totalAmount: { $sum: "$totalAmount" } 
              }
            }
          ]);

        const totalRevenue = revenue[0].totalAmount.toLocaleString('en-IN');
// counts for display
        const orderCount = await Order.count()
        const productCount = await Product.count()
        const categoryCount = await Category.count()
        const userCount = await User.count();

        const monthlyRevenue = await Order.aggregate([
            {
              $match: {
                createdAt: {
                  $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                  $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                }
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$totalAmount" }
              }
            }
          ])
        const mRevenue = monthlyRevenue[0].total.toLocaleString('en-IN')

        //graph1

        const monthlySales = await Order.aggregate([
            {
              $project: {
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" }
              }
            },
            {
              $group: {
                _id: { year: "$year", month: "$month" },
                totalOrders: { $sum: 1 }
              }
            },
            {
              $sort: {
                "_id.year": 1,
                "_id.month": 1
              }
            }
        ])
        // console.log(monthlySales);



        const graphDataSales = [];

        // Loop through the 12 months (1 to 12)
        for (let month = 1; month <= 12; month++) {
        const resultForMonth = monthlySales.find(result => result._id.month === month);
        if (resultForMonth) {
            graphDataSales.push(resultForMonth.totalOrders);
        } else {
            graphDataSales.push(0);
        }
        }
        // console.log("Formatted Result:", graphDataSales);

        //graph2
        
        const productCountData = await Product.aggregate([
            {
              $group: {
                _id: "$category",
                count: { $sum: 1 } // Count the documents in each category
              }
            }
          ])

        // console.log(productCountData);
        const categoryNames = productCountData.map(item => item._id);
        const categoryCounts = productCountData.map(item => item.count);

        // console.log("Category Names:", categoryNames);
        // console.log("Category Counts:", categoryCounts);

                
          

        res.render('adminDashboard',{
            adminData:adminData,
            totalRevenue: totalRevenue,
            orderCount: orderCount,
            productCount: productCount,
            categoryCount: categoryCount,
            monthlyRevenue: mRevenue,
            graphDataSales: graphDataSales,
            categoryNames: categoryNames,
            categoryCounts: categoryCounts,
            userCount: userCount
        })
                  
    } catch (error) {
        console.log(error.message); 
    }
}
//admin logout

const logOut = async(req,res)=>{
    try {
        req.session.destroy();
        res.redirect('/admin/login')
    } catch (error) {
        console.log(error.message);
    }
} 

// monthly report

// const monthlyReport = async (req,res) => {
//     try {
//       const start = moment().subtract(30, 'days').startOf('day'); // Data for the last 30 days
//       const end = moment().endOf('day');
  
//       const orderSuccessDetails = await Order.find({
//         createdAt: { $gte: start, $lte: end },
//         orderStatus: 'DELIVERED' 
//       });
//       console.log(orderSuccessDetails)
//       const monthlySales = {};
  
//       orderSuccessDetails.forEach(order => {
//         const monthName = moment(order.createdAt).format('MMMM');
//         if (!monthlySales[monthName]) {
//           monthlySales[monthName] = {
//             revenue: 0,
//             productCount: 0,
//             orderCount: 0,
//             codCount: 0,
//             razorpayCount: 0,
//           };
//         }
//         console.log("ORder: ",order)
//         monthlySales[monthName].revenue += order.GrandTotal;
//         monthlySales[monthName].productCount += order.items.length;
//         monthlySales[monthName].orderCount++;
  
//         if (order.payment=== 'cod') {
//           monthlySales[monthName].codCount++;
//         } else if (order.payment === 'Razorpay') {
//           monthlySales[monthName].razorpayCount++;
//         } 
//       });
  
//       const monthlyData = {
//         labels: [],
//         revenueData: [],
//         productCountData: [],
//         orderCountData: [],
//         codCountData: [],
//         razorpayCountData: [],
//       };
  
//       for (const monthName in monthlySales) {
//         if (monthlySales.hasOwnProperty(monthName)) {
//           monthlyData.labels.push(monthName);
//           monthlyData.revenueData.push(monthlySales[monthName].revenue);
//           monthlyData.productCountData.push(monthlySales[monthName].productCount);
//           monthlyData.orderCountData.push(monthlySales[monthName].orderCount);
//           monthlyData.codCountData.push(monthlySales[monthName].codCount);
//           monthlyData.razorpayCountData.push(monthlySales[monthName].razorpayCount);
//         }
//       }
//       console.log(monthlyData);
//       return res.json(monthlyData);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'An error occurred while generating the monthly report.' });
//     }
//   }



module.exports ={
    loadLogin,
    adminLogin,
    loadDashboard,
    logOut
}