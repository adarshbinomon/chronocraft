const bcrypt = require("bcrypt");
const User = require("../../model/userModel");
const Order = require("../../model/orderModel");
const Product = require("../../model/productModel");
const Category = require("../../model/categoryModel");
const moment = require("moment");

//load login

const loadLogin = async (req, res) => {
  try {
    res.render("adminLogin");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

//admin login

const adminLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const adminData = await User.findOne({ email: email });
    if (adminData) {
      const passwordMatch = await bcrypt.compare(password, adminData.password);
      if (passwordMatch && adminData.isAdmin == 1) {
        req.session.admin_id = adminData._id;
        console.log(adminData);
        res.redirect("/admin");
        console.log(req.session);
      } else {
        res.render("adminLogin", { message: "email or password incorrect" });
      }
    } else {
      res.render("adminLogin", { message: "email or password incorrect" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
//load home

const loadDashboard = async (req, res) => {
  try {
    const adminData = await User.findById({ _id: req.session.admin_id });
    //revenue for display
    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue = revenue[0].totalAmount.toLocaleString("en-IN");
    // counts for display
    const orderCount = await Order.count();
    const productCount = await Product.count();
    const categoryCount = await Category.count();
    const userCount = await User.count();

    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            $lt: new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              1
            ),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);
    const mRevenue = monthlyRevenue[0].total.toLocaleString("en-IN");

    //graph1

    const monthlySales = await Order.aggregate([
      {
        $project: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);
    // console.log(monthlySales);

    const graphDataSales = [];

    // Loop through the 12 months (1 to 12)
    for (let month = 1; month <= 12; month++) {
      const resultForMonth = monthlySales.find(
        (result) => result._id.month === month
      );
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
          count: { $sum: 1 }, // Count the documents in each category
        },
      },
    ]);

    // console.log(productCountData);
    const categoryNames = productCountData.map((item) => item._id);
    const categoryCounts = productCountData.map((item) => item.count);

    // console.log("Category Names:", categoryNames);
    // console.log("Category Counts:", categoryCounts);

    res.render("adminDashboard", {
      adminData: adminData,
      totalRevenue: totalRevenue,
      orderCount: orderCount,
      productCount: productCount,
      categoryCount: categoryCount,
      monthlyRevenue: mRevenue,
      graphDataSales: graphDataSales,
      categoryNames: categoryNames,
      categoryCounts: categoryCounts,
      userCount: userCount,
    });
  } catch (error) {
    console.log(error.message);
  }
};
//admin logout

const logOut = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/admin/login");
  } catch (error) {
    console.log(error.message);
  }
};

// monthly report

const generateReport = async (req, res) => {
  try {
    let orders = await Order.find().populate('products.productId');
  
    const PDFDocument = require('pdfkit');
  
    // Create a document with custom page size and margins
    const doc = new PDFDocument({ size: 'letter', margin: 50 });
  
    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(res);
  
    // Title
    doc.fontSize(20).text('Sales Report', { align: 'center' });
    doc.moveDown(); // Move down to create space below the title
  
    // Define table headers
    const headers = [
      'Index',
      'Date',
      'Order Id',
      'Qnty',
      'Total',
      'Discount',
      'Final Price',
    ];
  
    // Calculate column widths
    const colWidths = [35, 90, 170, 50, 70, 70, 70];
  
    // Define the height of the cells
    const rowHeight = 40; // Increase this value to make cells taller
  
    // Define cell padding for vertical alignment (adjust as needed)
    const cellPadding = (rowHeight - 12) / 2;
  
    // Set initial position for drawing
    let x = 50;
    let y = doc.y;
  
    // Draw table headers with an outline
    headers.forEach((header, index) => {
      doc
        .font('Helvetica-Bold')
        .fontSize(12)
        .text(header, x, y + cellPadding, { width: colWidths[index], align: 'center' });
  
      // Draw a rectangle outline around the header cell
      doc.rect(x, y, colWidths[index], rowHeight).stroke();
  
      x += colWidths[index];
    });
  
    // Draw table rows with an outline
    let currentPageY = y + rowHeight; // Move down below the headers
  
    orders.forEach((order, index) => {
      const total = order.totalAmount;
      const discount = order.discount;
      const orderId = order._id;
      const date = String(order.createdAt).slice(4, 16);
  
      order.products.forEach((product) => {
        const quantity = product.quantity;
        const finalPrice = total - discount;
  
        // Create an array of row data with the Indian Rupee symbol and formatted prices
        const rowData = [
          index + 1,
          date,
          orderId,
          quantity,
          total, // Format total price
          discount, // Format discount
          finalPrice, // Format final price
        ];
  
        x = 50;
        currentPageY += rowHeight; // Increase the cell height
  
        // Check if the current row will fit on the current page, if not, create a new page
        if (currentPageY + rowHeight > doc.page.height - 50) {
          doc.addPage(); // Create a new page
          currentPageY = 50; // Reset the current Y position
        }
  
        // Draw row data with an outline
        rowData.forEach((value, index) => {
          doc.font('Helvetica').fontSize(12).text(value.toString(), x, currentPageY + cellPadding, {
            width: colWidths[index],
            align: 'center',
          });
  
          // Draw a rectangle outline around the cell
          doc.rect(x, currentPageY, colWidths[index], rowHeight).stroke();
  
          x += colWidths[index];
        });
      });
    });
  
    // Finalize PDF file
    doc.end();
  } catch (error) {
    console.log(error.message);
  }
  
};

module.exports = {
  loadLogin,
  adminLogin,
  loadDashboard,
  logOut,
  generateReport,
};
