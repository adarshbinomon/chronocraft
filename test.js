<!DOCTYPE html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8">
    <title>Evara - eCommerce HTML Template</title>
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:title" content="">
    <meta property="og:type" content="">
    <meta property="og:url" content="">
    <meta property="og:image" content="">
    <!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="/assets/imgs/theme/favicon.svg">
    <!-- Template CSS -->
    <link rel="stylesheet" href="/assets/css/main.css?v=3.4">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>
</head>

<body>
    
    <!-- header -->    
    <%- include('partials/header')%>
    <!-- header -->

    <div class="mobile-header-active mobile-header-wrapper-style">
        <div class="mobile-header-wrapper-inner">
            <div class="mobile-header-top">
                <div class="mobile-header-logo">
                    <a href="index.html"><img src="/assets/imgs/theme/logo.svg" alt="logo"></a>
                </div>
                <div class="mobile-menu-close close-style-wrap close-style-position-inherit">
                    <button class="close-style search-close">
                        <i class="icon-top"></i>
                        <i class="icon-bottom"></i>
                    </button>
                </div>
            </div>
            <div class="mobile-header-content-area">
                <div class="mobile-search search-style-3 mobile-header-border">
                    <form action="#">
                        <input type="text" placeholder="Search for items…">
                        <button type="submit"><i class="fi-rs-search"></i></button>
                    </form>
                </div>
                <div class="mobile-menu-wrap mobile-header-border">
                    <div class="main-categori-wrap mobile-header-border">
                        <a class="categori-button-active-2" href="#">
                            <span class="fi-rs-apps"></span> Browse Categories
                        </a>
                        <div class="categori-dropdown-wrap categori-dropdown-active-small">
                            <ul>
                                <li><a href="shop-grid-right.html"><i class="evara-font-dress"></i>Women's Clothing</a></li>
                                <li><a href="shop-grid-right.html"><i class="evara-font-tshirt"></i>Men's Clothing</a></li>
                                <li> <a href="shop-grid-right.html"><i class="evara-font-smartphone"></i> Cellphones</a></li>
                                <li><a href="shop-grid-right.html"><i class="evara-font-desktop"></i>Computer & Office</a></li>
                                <li><a href="shop-grid-right.html"><i class="evara-font-cpu"></i>Consumer Electronics</a></li>
                                <li><a href="shop-grid-right.html"><i class="evara-font-home"></i>Home & Garden</a></li>
                                <li><a href="shop-grid-right.html"><i class="evara-font-high-heels"></i>Shoes</a></li>
                                <li><a href="shop-grid-right.html"><i class="evara-font-teddy-bear"></i>Mother & Kids</a></li>
                                <li><a href="shop-grid-right.html"><i class="evara-font-kite"></i>Outdoor fun</a></li>
                            </ul>
                        </div>
                    </div>
                    <!-- mobile menu start -->
                    <nav>
                        <ul class="mobile-menu">
                            <li class="menu-item-has-children"><span class="menu-expand"></span><a href="index.html">Home</a>
                                <ul class="dropdown">
                                    <li><a href="index.html">Home 1</a></li>
                                    <li><a href="index-2.html">Home 2</a></li>
                                    <li><a href="index-3.html">Home 3</a></li>
                                    <li><a href="index-4.html">Home 4</a></li>
                                </ul>
                            </li>
                            <li class="menu-item-has-children"><span class="menu-expand"></span><a href="shop-grid-right.html">shop</a>
                                <ul class="dropdown">
                                    <li><a href="shop-grid-right.html">Shop Grid – Right Sidebar</a></li>
                                    <li><a href="shop-grid-left.html">Shop Grid – Left Sidebar</a></li>
                                    <li><a href="shop-list-right.html">Shop List – Right Sidebar</a></li>
                                    <li><a href="shop-list-left.html">Shop List – Left Sidebar</a></li>
                                    <li><a href="shop-fullwidth.html">Shop - Wide</a></li>
                                    <li class="menu-item-has-children"><span class="menu-expand"></span><a href="#">Single Product</a>
                                        <ul class="dropdown">
                                            <li><a href="shop-product-right.html">Product – Right Sidebar</a></li>
                                            <li><a href="shop-product-left.html">Product – Left Sidebar</a></li>
                                            <li><a href="shop-product-full.html">Product – No sidebar</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="shop-filter.html">Shop – Filter</a></li>
                                    <li><a href="shop-wishlist.html">Shop – Wishlist</a></li>
                                    <li><a href="shop-cart.html">Shop – Cart</a></li>
                                    <li><a href="shop-checkout.html">Shop – Checkout</a></li>
                                    <li><a href="shop-compare.html">Shop – Compare</a></li>
                                </ul>
                            </li>
                            <li class="menu-item-has-children"><span class="menu-expand"></span><a href="#">Mega menu</a>
                                <ul class="dropdown">
                                    <li class="menu-item-has-children"><span class="menu-expand"></span><a href="#">Women's Fashion</a>
                                        <ul class="dropdown">
                                            <li><a href="shop-product-right.html">Dresses</a></li>
                                            <li><a href="shop-product-right.html">Blouses & Shirts</a></li>
                                            <li><a href="shop-product-right.html">Hoodies & Sweatshirts</a></li>
                                            <li><a href="shop-product-right.html">Women's Sets</a></li>
                                        </ul>
                                    </li>
                                    <li class="menu-item-has-children"><span class="menu-expand"></span><a href="#">Men's Fashion</a>
                                        <ul class="dropdown">
                                            <li><a href="shop-product-right.html">Jackets</a></li>
                                            <li><a href="shop-product-right.html">Casual Faux Leather</a></li>
                                            <li><a href="shop-product-right.html">Genuine Leather</a></li>
                                        </ul>
                                    </li>
                                    <li class="menu-item-has-children"><span class="menu-expand"></span><a href="#">Technology</a>
                                        <ul class="dropdown">
                                            <li><a href="shop-product-right.html">Gaming Laptops</a></li>
                                            <li><a href="shop-product-right.html">Ultraslim Laptops</a></li>
                                            <li><a href="shop-product-right.html">Tablets</a></li>
                                            <li><a href="shop-product-right.html">Laptop Accessories</a></li>
                                            <li><a href="shop-product-right.html">Tablet Accessories</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li class="menu-item-has-children"><span class="menu-expand"></span><a href="blog-category-fullwidth.html">Blog</a>
                                <ul class="dropdown">
                                    <li><a href="blog-category-grid.html">Blog Category Grid</a></li>
                                    <li><a href="blog-category-list.html">Blog Category List</a></li>
                                    <li><a href="blog-category-big.html">Blog Category Big</a></li>
                                    <li><a href="blog-category-fullwidth.html">Blog Category Wide</a></li>
                                    <li class="menu-item-has-children"><span class="menu-expand"></span><a href="#">Single Product Layout</a>
                                        <ul class="dropdown">
                                            <li><a href="blog-post-left.html">Left Sidebar</a></li>
                                            <li><a href="blog-post-right.html">Right Sidebar</a></li>
                                            <li><a href="blog-post-fullwidth.html">No Sidebar</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li class="menu-item-has-children"><span class="menu-expand"></span><a href="#">Pages</a>
                                <ul class="dropdown">
                                    <li><a href="page-about.html">About Us</a></li>
                                    <li><a href="page-contact.html">Contact</a></li>
                                    <li><a href="page-account.html">My Account</a></li>
                                    <li><a href="page-login-register.html">login/register</a></li>
                                    <li><a href="page-purchase-guide.html">Purchase Guide</a></li>
                                    <li><a href="page-privacy-policy.html">Privacy Policy</a></li>
                                    <li><a href="page-terms.html">Terms of Service</a></li>
                                    <li><a href="page-404.html">404 Page</a></li>
                                </ul>
                            </li>
                            <li class="menu-item-has-children"><span class="menu-expand"></span><a href="#">Language</a>
                                <ul class="dropdown">
                                    <li><a href="#">English</a></li>
                                    <li><a href="#">French</a></li>
                                    <li><a href="#">German</a></li>
                                    <li><a href="#">Spanish</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <!-- mobile menu end -->
                </div>
                <div class="mobile-header-info-wrap mobile-header-border">
                    <div class="single-mobile-header-info mt-30">
                        <a  href="page-contact.html"> Our location </a>
                    </div>
                    <div class="single-mobile-header-info">
                        <a href="page-login-register.html">Log In / Sign Up </a>
                    </div>
                    <div class="single-mobile-header-info">
                        <a href="#">(+01) - 2345 - 6789 </a>
                    </div>
                </div>
                <div class="mobile-social-icon">
                    <h5 class="mb-15 text-grey-4">Follow Us</h5>
                    <a href="#"><img src="/assets/imgs/theme/icons/icon-facebook.svg" alt=""></a>
                    <a href="#"><img src="/assets/imgs/theme/icons/icon-twitter.svg" alt=""></a>
                    <a href="#"><img src="/assets/imgs/theme/icons/icon-instagram.svg" alt=""></a>
                    <a href="#"><img src="/assets/imgs/theme/icons/icon-pinterest.svg" alt=""></a>
                    <a href="#"><img src="/assets/imgs/theme/icons/icon-youtube.svg" alt=""></a>
                </div>
            </div>
        </div>
    </div>
    <main class="main">
        <div class="page-header breadcrumb-wrap">
            <div class="container">
                <div class="breadcrumb">
                    <a href="index.html" rel="nofollow">Home</a>
                    <span></span> Shop
                    <span></span> Your Cart
                </div>
            </div>
        </div>
        <section class="mt-50 mb-50">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="table-responsive">
                            <table class="table shopping-summery text-center clean">
                                <thead>
                                    <tr class="main-heading">
                                        <th scope="col">Image</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Subtotal</th>
                                        <th scope="col">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <% var sum = 0%>
                                    <% for(var i=0;i<userCart.cart.length;i++) { %>
                                    <tr>
                                        <td class="image product-thumbnail"><img src="/assetsbackend/imgs/products/<%=userCart.cart[i].productId.image[0]%>" alt="#"></td>
                                        <td class="product-des product-name">
                                            <h5 class="product-name"><a href="shop-product-right.html"><%= userCart.cart[i].productId.productName %></a></h5>
                                            <p class="font-xs"><%= userCart.cart[i].productId.brandName %>
                                            </p>
                                        </td>
                                        <td class="price" data-title="Price"><span>₹ <%= userCart.cart[i].productId.salePrice %> </span></td>
                                        <td class="text-center" data-title="Stock">
                                            <div class=" radius  m-auto">
                                                <a href="#" class="btn px-2 py-0" onclick="changeQuantity('<%=userCart.cart[i].productId._id%>',-1,'<%= userCart.cart[i].productId.salePrice %>','subtot-<%= i %>','cartSubTotal','total','qty-<%= userCart.cart[i].productId._id %>')" >-</a>
                                                <span id="qty-<%= userCart.cart[i].productId._id %>" class="qty-val mx-3"><%= userCart.cart[i].quantity %></span>
                                                <a href="#" class="btn px-2 py-0" onclick="changeQuantity('<%=userCart.cart[i].productId._id%>',1,'<%= userCart.cart[i].productId.salePrice %>','subtot-<%= i %>','cartSubTotal','total','qty-<%= userCart.cart[i].productId._id %>')" >+</a>
                                            </div>
                                        </td>
                                        <td class="text-right" data-title="Cart">
                                            <span>₹</span><span id="subtot-<%= i %>" > <%= userCart.cart[i].productId.salePrice * userCart.cart[i].quantity %></span>
                                            <% sum = sum+(userCart.cart[i].productId.salePrice * userCart.cart[i].quantity)%>
                                        </td>
                                        <td class="action"  data-title="Remove"><a  href="/remove-cart/<%=userCart.cart[i].productId._id%>" class="text-muted"><i class="fi-rs-trash"></i></a></td>                                    </tr>
                                    <% } %>
                                    <!-- <tr>
                                        <td class="image"><img src="/assets/imgs/shop/product-11-2.jpg" alt="#"></td>
                                        <td class="product-des">
                                            <h5 class="product-name"><a href="shop-product-right.html">Amazon Essentials Women's Tank</a></h5>
                                            <p class="font-xs">Sit at ipsum amet clita no est,<br> sed amet sadipscing et gubergren</p>
                                        </td>
                                        <td class="price" data-title="Price"><span>$75.00 </span></td>
                                        <td class="text-center" data-title="Stock">
                                            <div class="detail-qty border radius  m-auto">
                                                <a href="#" class="qty-down"><i class="fi-rs-angle-small-down"></i></a>
                                                <span class="qty-val">2</span>
                                                <a href="#" class="qty-up"><i class="fi-rs-angle-small-up"></i></a>
                                            </div>
                                        </td>
                                        <td class="text-right" data-title="Cart">
                                            <span>$150.00 </span>
                                        </td>
                                        <td class="action" data-title="Remove"><a href="#" class="text-muted"><i class="fi-rs-trash"></i></a></td>
                                    </tr>
                                    <tr>
                                        <td class="image"><img src="/assets/imgs/shop/product-6-1.jpg" alt="#"></td>
                                        <td class="product-des">
                                            <h5 class="product-name"><a href="shop-product-right.html">Amazon Brand - Daily Ritual Women's Jersey </a></h5>
                                            <p class="font-xs">Erat amet et et amet diam et et.<br> Justo amet at dolore
                                            </p>
                                        </td>
                                        <td class="price" data-title="Price"><span>$62.00 </span></td>
                                        <td class="text-center" data-title="Stock">
                                            <div class="detail-qty border radius  m-auto">
                                                <a href="#" class="qty-down"><i class="fi-rs-angle-small-down"></i></a>
                                                <span class="qty-val">1</span>
                                                <a href="#" class="qty-up"><i class="fi-rs-angle-small-up"></i></a>
                                            </div>
                                        </td>
                                        <td class="text-right" data-title="Cart">
                                            <span>$62.00 </span>
                                        </td>
                                        <td class="action" data-title="Remove"><a href="#" class="text-muted"><i class="fi-rs-trash"></i></a></td>
                                    </tr> -->
                                    <!-- <tr>
                                        <td colspan="6" class="text-end">
                                            <a href="#" class="text-muted"> <i class="fi-rs-cross-small"></i> Clear Cart</a>
                                        </td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </div>
                        <div class="cart-action text-end">
                            <a class="btn  mr-10 mb-sm-15"><i class="fi-rs-shuffle mr-10"></i>Update Cart</a>
                            <a class="btn "><i class="fi-rs-shopping-bag mr-10"></i>Continue Shopping</a>
                        </div>
                        <div class="divider center_icon mt-50 mb-50"><i class="fi-rs-fingerprint"></i></div>
                        <div class="row mb-50"> 
                            <div class="col-lg-6 col-md-12">
                                
                                <div class="mb-30 mt-50">
                                    <div class="heading_s1 mb-3">
                                        <h4>Apply Coupon</h4>
                                    </div>
                                    <div class="total-amount">
                                        <div class="left">
                                            <div class="coupon">
                                                <form action="#" target="_blank">
                                                    <div class="form-row row justify-content-center">
                                                        <div class="form-group col-lg-6">
                                                            <select class="form-select" name="coupon">                                                            <% for (var i = 0; i < coupons.length; i++) { %>
                                                                <option value="<%= coupons[i]._id %>"><%= coupons[i].couponName %></option>
                                                            <% } %></div>  
                                                        </select>                                                      
                                                    </div>
                                                        <div class="form-group col-lg-6">
                                                            <button onclick="applycoupon()" class="btn  btn-sm"><i class="fi-rs-label mr-10"></i>Apply</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12">
                                <div class="border p-md-4 p-30 border-radius cart-totals">
                                    <div class="heading_s1 mb-3">
                                        <h4>Cart Totals</h4>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table">
                                            <tbody>
                                                <tr>
                                                    <td class="cart_total_label">Cart Subtotal</td>
                                                    <td class="cart_total_amount">₹<span id="grandTotal" class="font-lg fw-900 text-brand"><%=grandTotal%></span></td>
                                                </tr>
                                                <tr>
                                                    <td class="cart_total_label">Shipping</td>
                                                    <td class="cart_total_amount"> <i class="ti-gift mr-5"></i> Free Shipping</td>
                                                </tr>
                                                <tr>
                                                    <td class="cart_total_label">Total</td>
                                                    <td class="cart_total_amount"><strong><span id="total" class="font-xl fw-900 text-brand">₹ <%= grandTotal %></span></strong></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <% if(userCart.cart.length) { %>
                                    <a href="/checkout" class="btn "> <i class="fi-rs-box-alt mr-10"></i> Proceed To CheckOut</a>
                                    <%} else{ %> 
                                    <a type="button" onclick="cartEmpty()" class="btn "> <i class="fi-rs-box-alt mr-10"></i> Proceed To CheckOut</a>
                                    <% } %>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    
    <!-- footer -->
    <%- include('partials/footer')%>
    <!-- footer -->

    <!-- Preloader Start -->
    <div id="preloader-active">
        <div class="preloader d-flex align-items-center justify-content-center">
            <div class="preloader-inner position-relative">
                <div class="text-center">
                    <h5 class="mb-5">Now Loading</h5>
                    <div class="loader">
                        <div class="bar bar1"></div>
                        <div class="bar bar2"></div>
                        <div class="bar bar3"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<!-- scripts -->

<script>
    function cartEmpty() {
        Swal.fire(
        'Oops!, Cart is Empty',
        'Add items to your cart before checking out!'
        )
    }
</script>


    
    <script>
    function changeQuantity(productId,count,price,subTotal,cartSubTotal,total,quantity){
        console.log(productId,count,price,subTotal,cartSubTotal,total,quantity);
        const subtotalValue = document.getElementById(subTotal).innerHTML
        const grandTotalValue = document.getElementById('grandTotal').innerHTML
        const quantityValue = document.getElementById(quantity).innerHTML
        let totalValue = parseInt(subtotalValue)
       
        console.log(quantityValue,count);
        if(quantityValue == 1 && count == -1){
            return;
        }
        $.ajax({ 
         url:'/change-quantity',
         method: 'post',
         data:{
             productId,
             count
         },
        })
        
        
        if(count === 1){
            document.getElementById(subTotal).innerHTML = parseInt(price)+totalValue
            document.getElementById('grandTotal').innerHTML = parseInt(price)+parseInt(grandTotalValue);
            document.getElementById('total').innerHTML = parseInt(price)+parseInt(grandTotalValue);
            document.getElementById(quantity).innerHTML = parseInt(quantityValue)+1;


        }else if(count === -1){
            document.getElementById(subTotal).innerHTML = totalValue-parseInt(price)
            document.getElementById('grandTotal').innerHTML = parseInt(grandTotalValue)-parseInt(price);
            document.getElementById('total').innerHTML = parseInt(grandTotalValue)-parseInt(price);
            document.getElementById(quantity).innerHTML = parseInt(quantityValue)-1;

        }
    
              
    }</script>
    <!-- Vendor JS-->
    <script src="/assets/js/vendor/modernizr-3.6.0.min.js"></script>
    <script src="/assets/js/vendor/jquery-3.6.0.min.js"></script>
    <script src="/assets/js/vendor/jquery-migrate-3.3.0.min.js"></script>
    <script src="/assets/js/vendor/bootstrap.bundle.min.js"></script>
    <script src="/assets/js/plugins/slick.js"></script>
    <script src="/assets/js/plugins/jquery.syotimer.min.js"></script>
    <script src="/assets/js/plugins/wow.js"></script>
    <script src="/assets/js/plugins/jquery-ui.js"></script>
    <script src="/assets/js/plugins/perfect-scrollbar.js"></script>
    <script src="/assets/js/plugins/magnific-popup.js"></script>
    <script src="/assets/js/plugins/select2.min.js"></script>
    <script src="/assets/js/plugins/waypoints.js"></script>
    <script src="/assets/js/plugins/counterup.js"></script>
    <script src="/assets/js/plugins/jquery.countdown.min.js"></script>
    <script src="/assets/js/plugins/images-loaded.js"></script>
    <script src="/assets/js/plugins/isotope.js"></script>
    <script src="/assets/js/plugins/scrollup.js"></script>
    <script src="/assets/js/plugins/jquery.vticker-min.js"></script>
    <!-- Template  JS -->
    <script src="/assets/js/main.js?v=3.4"></script>
    <script src="/assets/js/shop.js?v=3.4"></script>
</body>

</html>




//admindashboard</meta>

<div class="row">
<div class="col-xl-8 col-lg-12">
    <!-- <div class="card mb-4">
        <article class="card-body">
            <h5 class="card-title">Sale statistics</h5>
            <canvas id="myChart" height="120px"></canvas>
        </article>
    </div> -->
    <div class="col-md-9">
        <canvas id="lineChart"></canvas>
      </div>
    <div class="row">
        <div class="col-lg-5">
            <div class="card mb-4">
                <article class="card-body">
                    <h5 class="card-title">New Members</h5>
                    <div class="new-member-list">
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <div class="d-flex align-items-center">
                                <img src="/assetsbackend/imgs/people/avatar4.jpg" alt="" class="avatar">
                                <div>
                                    <h6>Patric Adams</h6>
                                    <p class="text-muted font-xs">
                                        Sanfrancisco
                                    </p>
                                </div>
                            </div>
                            <a href="#" class="btn btn-xs"><i class="material-icons md-add"></i> Add</a>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <div class="d-flex align-items-center">
                                <img src="/assetsbackend/imgs/people/avatar2.jpg" alt="" class="avatar">
                                <div>
                                    <h6>Dilan Specter</h6>
                                    <p class="text-muted font-xs">
                                        Sanfrancisco
                                    </p>
                                </div>
                            </div>
                            <a href="#" class="btn btn-xs"><i class="material-icons md-add"></i> Add</a>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <div class="d-flex align-items-center">
                                <img src="/assetsbackend/imgs/people/avatar3.jpg" alt="" class="avatar">
                                <div>
                                    <h6>Tomas Baker</h6>
                                    <p class="text-muted font-xs">
                                        Sanfrancisco
                                    </p>
                                </div>
                            </div>
                            <a href="#" class="btn btn-xs"><i class="material-icons md-add"></i> Add</a>
                        </div>
                    </div>
                </article>
            </div>
        </div>
        <div class="col-lg-7">
            <div class="card mb-4">
                <article class="card-body">
                    <h5 class="card-title">Recent activities</h5>
                    <ul class="verti-timeline list-unstyled font-sm">
                        <li class="event-list">
                            <div class="event-timeline-dot">
                                <i class="material-icons md-play_circle_outline font-xxl"></i>
                            </div>
                            <div class="media">
                                <div class="me-3">
                                    <h6><span>Today</span> <i class="material-icons md-trending_flat text-brand ml-15 d-inline-block"></i></h6>
                                </div>
                                <div class="media-body">
                                    <div>
                                        Lorem ipsum dolor sit amet consectetur
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="event-list active">
                            <div class="event-timeline-dot">
                                <i class="material-icons md-play_circle_outline font-xxl animation-fade-right"></i>
                            </div>
                            <div class="media">
                                <div class="me-3">
                                    <h6><span>17 May</span> <i class="material-icons md-trending_flat text-brand ml-15 d-inline-block"></i></h6>
                                </div>
                                <div class="media-body">
                                    <div>
                                        Debitis nesciunt voluptatum dicta reprehenderit
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="event-list">
                            <div class="event-timeline-dot">
                                <i class="material-icons md-play_circle_outline font-xxl"></i>
                            </div>
                            <div class="media">
                                <div class="me-3">
                                    <h6><span>13 May</span> <i class="material-icons md-trending_flat text-brand ml-15 d-inline-block"></i></h6>
                                </div>
                                <div class="media-body">
                                    <div>
                                        Accusamus voluptatibus voluptas.
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="event-list">
                            <div class="event-timeline-dot">
                                <i class="material-icons md-play_circle_outline font-xxl"></i>
                            </div>
                            <div class="media">
                                <div class="me-3">
                                    <h6><span>05 April</span> <i class="material-icons md-trending_flat text-brand ml-15 d-inline-block"></i></h6>
                                </div>
                                <div class="media-body">
                                    <div>
                                        At vero eos et accusamus et iusto odio dignissi
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="event-list">
                            <div class="event-timeline-dot">
                                <i class="material-icons md-play_circle_outline font-xxl"></i>
                            </div>
                            <div class="media">
                                <div class="me-3">
                                    <h6><span>26 Mar</span> <i class="material-icons md-trending_flat text-brand ml-15 d-inline-block"></i></h6>
                                </div>
                                <div class="media-body">
                                    <div>
                                        Responded to need “Volunteer Activities
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </article>
            </div>
        </div>
    </div>
</div>
<div class="col-xl-4 col-lg-12">
    <div class="card mb-4">
        <article class="card-body">
            <h5 class="card-title">Revenue Base on Area</h5>
            <canvas id="myChart2" height="217"></canvas>
        </article>
    </div>
    <div class="card mb-4">
        <article class="card-body">
            <h5 class="card-title">Marketing Chanel</h5>
            <span class="text-muted font-xs">Facebook</span>
            <div class="progress mb-3">
                <div class="progress-bar" role="progressbar" style="width: 15%">15%</div>
            </div>
            <span class="text-muted font-xs">Instagram</span>
            <div class="progress mb-3">
                <div class="progress-bar" role="progressbar" style="width: 65%">65% </div>
            </div>
            <span class="text-muted font-xs">Google</span>
            <div class="progress mb-3">
                <div class="progress-bar" role="progressbar" style="width: 51%"> 51% </div>
            </div>
            <span class="text-muted font-xs">Twitter</span>
            <div class="progress mb-3">
                <div class="progress-bar" role="progressbar" style="width: 80%"> 80%</div>
            </div>
            <span class="text-muted font-xs">Other</span>
            <div class="progress mb-3">
                <div class="progress-bar" role="progressbar" style="width: 80%"> 80%</div>
            </div>
        </article>
    </div>
</div>
</div>
<div class="card mb-4">
<header class="card-header">
    <h4 class="card-title">Latest orders</h4>
    <div class="row align-items-center">
        <div class="col-md-3 col-12 me-auto mb-md-0 mb-3">
            <div class="custom_select">
                <select class="form-select select-nice">
                    <option selected>All Categories</option>
                    <option>Women's Clothing</option>
                    <option>Men's Clothing</option>
                    <option>Cellphones</option>
                    <option>Computer & Office</option>
                    <option>Consumer Electronics</option>
                    <option>Jewelry & Accessories</option>
                    <option>Home & Garden</option>
                    <option>Luggage & Bags</option>
                    <option>Shoes</option>
                    <option>Mother & Kids</option>
                </select>
            </div>
        </div>
        <div class="col-md-2 col-6">
            <input type="date" value="02.05.2022" class="form-control">
        </div>
        <div class="col-md-2 col-6">
            <div class="custom_select">
                <select class="form-select select-nice">
                    <option selected>Status</option>
                    <option>All</option>
                    <option>Paid</option>
                    <option>Chargeback</option>
                    <option>Refund</option>
                </select>
            </div>
        </div>
    </div>
</header>
<div class="card-body">
    <div class="table-responsive">
        <div class="table-responsive">
            <table class="table align-middle table-nowrap mb-0">
                <thead class="table-light">
                    <tr>
                        <th scope="col" class="text-center">
                            <div class="form-check align-middle">
                                <input class="form-check-input" type="checkbox" id="transactionCheck01">
                                <label class="form-check-label" for="transactionCheck01"></label>
                            </div>
                        </th>
                        <th class="align-middle" scope="col">Order ID</th>
                        <th class="align-middle" scope="col">Billing Name</th>
                        <th class="align-middle" scope="col">Date</th>
                        <th class="align-middle" scope="col">Total</th>
                        <th class="align-middle" scope="col">Payment Status</th>
                        <th class="align-middle" scope="col">Payment Method</th>
                        <th class="align-middle" scope="col">View Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="transactionCheck02">
                                <label class="form-check-label" for="transactionCheck02"></label>
                            </div>
                        </td>
                        <td><a href="#" class="fw-bold">#SK2540</a> </td>
                        <td>Neal Matthews</td>
                        <td>
                            07 Oct, 2022
                        </td>
                        <td>
                            $400
                        </td>
                        <td>
                            <span class="badge badge-pill badge-soft-success">Paid</span>
                        </td>
                        <td>
                            <i class="material-icons md-payment font-xxl text-muted mr-5"></i> Mastercard
                        </td>
                        <td>
                            <a href="#" class="btn btn-xs"> View details</a>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="transactionCheck03">
                                <label class="form-check-label" for="transactionCheck03"></label>
                            </div>
                        </td>
                        <td><a href="#" class="fw-bold">#SK2541</a> </td>
                        <td>Jamal Burnett</td>
                        <td>
                            07 Oct, 2022
                        </td>
                        <td>
                            $380
                        </td>
                        <td>
                            <span class="badge badge-pill badge-soft-danger">Chargeback</span>
                        </td>
                        <td>
                            <i class="material-icons md-payment font-xxl text-muted mr-5"></i> Visa
                        </td>
                        <td>
                            <a href="#" class="btn btn-xs"> View details</a>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="transactionCheck04">
                                <label class="form-check-label" for="transactionCheck04"></label>
                            </div>
                        </td>
                        <td><a href="#" class="fw-bold">#SK2542</a> </td>
                        <td>Juan Mitchell</td>
                        <td>
                            06 Oct, 2022
                        </td>
                        <td>
                            $384
                        </td>
                        <td>
                            <span class="badge badge-pill badge-soft-success">Paid</span>
                        </td>
                        <td>
                            <i class="material-icons md-payment font-xxl text-muted mr-5"></i> Paypal
                        </td>
                        <td>
                            <a href="#" class="btn btn-xs"> View details</a>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="transactionCheck05">
                                <label class="form-check-label" for="transactionCheck05"></label>
                            </div>
                        </td>
                        <td><a href="#" class="fw-bold">#SK2543</a> </td>
                        <td>Barry Dick</td>
                        <td>
                            05 Oct, 2022
                        </td>
                        <td>
                            $412
                        </td>
                        <td>
                            <span class="badge badge-pill badge-soft-success">Paid</span>
                        </td>
                        <td>
                            <i class="material-icons md-payment font-xxl text-muted mr-5"></i> Mastercard
                        </td>
                        <td>
                            <a href="#" class="btn btn-xs"> View details</a>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="transactionCheck06">
                                <label class="form-check-label" for="transactionCheck06"></label>
                            </div>
                        </td>
                        <td><a href="#" class="fw-bold">#SK2544</a> </td>
                        <td>Ronald Taylor</td>
                        <td>
                            04 Oct, 2022
                        </td>
                        <td>
                            $404
                        </td>
                        <td>
                            <span class="badge badge-pill badge-soft-warning">Refund</span>
                        </td>
                        <td>
                            <i class="material-icons md-payment font-xxl text-muted mr-5"></i> Visa
                        </td>
                        <td>
                            <a href="#" class="btn btn-xs"> View details</a>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="transactionCheck07">
                                <label class="form-check-label" for="transactionCheck07"></label>
                            </div>
                        </td>
                        <td><a href="#" class="fw-bold">#SK2545</a> </td>
                        <td>Jacob Hunter</td>
                        <td>
                            04 Oct, 2022
                        </td>
                        <td>
                            $392
                        </td>
                        <td>
                            <span class="badge badge-pill badge-soft-success">Paid</span>
                        </td>
                        <td>
                            <i class="material-icons md-payment font-xxl text-muted mr-5"></i> Paypal
                        </td>
                        <td>
                            <a href="#" class="btn btn-xs"> View details</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div> <!-- table-responsive end// -->
</div>
</div>
<div class="pagination-area mt-30 mb-50">
<nav aria-label="Page navigation example">
    <ul class="pagination justify-content-start">
        <li class="page-item active"><a class="page-link" href="#">01</a></li>
        <li class="page-item"><a class="page-link" href="#">02</a></li>
        <li class="page-item"><a class="page-link" href="#">03</a></li>
        <li class="page-item"><a class="page-link dot" href="#">...</a></li>
        <li class="page-item"><a class="page-link" href="#">16</a></li>
        <li class="page-item"><a class="page-link" href="#"><i class="material-icons md-chevron_right"></i></a></li>
    </ul>
</nav>
</div>


// data table

<table class="table table-hover" id="dataTable">
                    <thead>
                      <tr>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Brand Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">Sale Price</th>
                        <th scope="col">isListed</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                        <% for(var i=0;i<products.length;i++){ %>
                            <tr>
                              <td><%= i+1 %></td>
                              <td><%= products[i].productName %></td>
                              <td><%= products[i].brandName %></td>
                              <td><%= products[i].category %></td>
                              <td><%= products[i].regularPrice %></td>
                              <td><%= products[i].salePrice %></td>
                              <td><%= products[i].isListed %></td>
                              <td><%= products[i].quantity %></td>
                              <td> <div class="d-flex"><a href="/admin/edit-product/<%=products[i]._id%>" class="btn-sm btn-info me-auto">Edit</a> <a type="button" href="/admin/delete-product/<%=products[i]._id%>" class="btn-sm btn-danger">Delete</a></div>
                            </tr>
                     ̰     <% } %>
                  </table>







                  <section class="pt-150 pb-150">
            <div class="container">
                <div class="row">
                    <div class="col-lg-10 m-auto">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="dashboard-menu">
                                    <ul class="nav flex-column" role="tablist">
                                       
                                        <li class="nav-item">
                                            <a class="nav-link active" id="orders-tab" data-bs-toggle="tab" href="#orders" role="tab" aria-controls="orders" aria-selected="true"><i class="fi-rs-shopping-bag mr-10"></i>Orders</a>
                                        </li>
                                        <!-- <li class="nav-item">
                                            <a class="nav-link" id="track-orders-tab" data-bs-toggle="tab" href="#track-orders" role="tab" aria-controls="track-orders" aria-selected="false"><i class="fi-rs-shopping-cart-check mr-10"></i>Track Your Order</a>
                                        </li> -->
                                        <li class="nav-item">
                                            <a class="nav-link" id="address-tab" data-bs-toggle="tab" href="#address" role="tab" aria-controls="address" aria-selected="true"><i class="fi-rs-marker mr-10"></i>My Address</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="account-detail-tab" data-bs-toggle="tab" href="#account-detail" role="tab" aria-controls="account-detail" aria-selected="true"><i class="fi-rs-user mr-10"></i>Account details</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="/logout"><i class="fi-rs-sign-out mr-10"></i>Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="tab-content dashboard-content">
                                    
                                    <div class="tab-pane fade active show"  id="orders" role="tabpanel" aria-labelledby="orders-tab">
                                        <div class="card">
                                            <div class="card-header">
                                                <h5 class="mb-0">Your Orders</h5>
                                            </div>
                                            <!-- <div class="card-body">
                                                <form action="/search-orderid?id">
                                                    <input style="width: 200px;" type="text" name="orderSearch"
                                                        placeholder="Search order ID" class="form-control bg-white mb-4">
                                                </form> -->
                                                <div class="table-responsive">
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Order</th>
                                                                <th>Date</th>
                                                                <th>Status</th>
                                                                <th>Total</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <% for(let i=0;i<orders.length;i++) {  %>
                                                            <tr>
                                                                <td><%=String(orders[i]._id).slice(-6)%></td>
                                                                <td><%= String(orders[i].createdAt).slice(4, 16) %></td>
                                                                <td><%=orders[i].orderStatus%></td>
                                                                <td>₹ <%=orders[i].totalAmount%> </td>
                                                                <td><a href="/order-details/<%=orders[i]._id%>" class="btn-small d-block">View</a></td>
                                                            </tr>
                                                            <% } %>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="pagination justify-content-center m-5">
                                                    <% if (totalPages> 1) { %>
                                                        <ul class="pagination">
                                                            <% if (page> 1) { %>
                                                                <li class="page-item">
                                                                    <a class="page-link green-pagination-link"
                                                                        href="?page=<%= page - 1 %>&orderSearch=<%=search%>">Previous</a>
                                                                </li>
                                                                <% } %>

                                                                    <% for (let i=1; i <=totalPages; i++) { %>
                                                                        <li class="page-item">
                                                                            <% if (i===page) { %>
                                                                                <span class="page-link">
                                                                                    <%= i %>
                                                                                </span>
                                                                                <% } else { %>
                                                                                    <a class="page-link green-pagination-link"
                                                                                        href="?page=<%= i %>">
                                                                                        <%= i %>
                                                                                    </a>
                                                                                    <% } %>
                                                                        </li>
                                                                        <% } %>

                                                                            <% if (page < totalPages) { %>
                                                                                <li class="page-item">
                                                                                    <a class="page-link green-pagination-link"
                                                                                        href="?page=<%= page + 1 %>&orderSearch=<%=search%>">Next</a>
                                                                                </li>
                                                                                <% } %>
                                                        </ul>
                                                        <% } %>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="track-orders" role="tabpanel" aria-labelledby="track-orders-tab">
                                        <div class="card">
                                            <div class="card-header">
                                                <h5 class="mb-0">Orders tracking</h5>
                                            </div>
                                            <div class="card-body contact-from-area">
                                                <p>To track your order please enter your OrderID in the box below and press "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
                                                <div class="row">
                                                    <div class="col-lg-8">
                                                        <form class="contact-form-style mt-30 mb-50" action="#" method="post">
                                                            <div class="input-style mb-20">
                                                                <label>Order ID</label>
                                                                <input name="order-id" placeholder="Found in your order confirmation email" type="text" class="square">
                                                            </div>
                                                            <div class="input-style mb-20">
                                                                <label>Billing email</label>
                                                                <input name="billing-email" placeholder="Email you used during checkout" type="email" class="square">
                                                            </div>
                                                            <button class="submit submit-auto-width" type="submit">Track</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="address" role="tabpanel" aria-labelledby="address-tab">
                                        <a href="/add-address" class="btn btn-fill-out btn-block mt-30">Add Address</a>

                                        
                                        <div class="row mt-20">
                                            <% for (let i = 0; i < userData.address.length; i++) { %>
                                            <div class="col-lg-6">
                                                <div class="card mb-3 mb-lg-0">
                                                    <div class="card-header">
                                                        <h5 class="mb-0"><%= userData.address[i].addressType %></h5>
                                                    </div>
                                                    <div class="card-body">
                                                        <address><%=userData.address[i].name%><br> <%=userData.address[i].addressLine1%>, <%=userData.address[i].addressLine2%>, <%=userData.address[i].city%><br><%=userData.address[i].state%><br><%=userData.address[i].pinCode%><br><%=userData.address[i].phone%><br><%=userData.address[i].email%></address>

                                                        <a href="/edit-address/<%= i %>" class="btn-small">Edit</a>
                                                    </div>
                                                </div>
                                            </div>
                                          
                                            <% } %>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="account-detail" role="tabpanel" aria-labelledby="account-detail-tab">
                                        <div class="card">
                                            <div class="card-header">
                                                <h5>Change password</h5>
                                            </div>
                                            <div class="card-body">
                                                <form method="post" name="enq">
                                                    <div class="row">
                                                        <div class="form-group col-md-12">
                                                            <label>Current Password <span class="required">*</span></label>
                                                            <input required="" class="form-control square" name="currentPassword" id="currentPassword" type="password">
                                                        </div>
                                                        <div class="form-group col-md-12">
                                                            <label>New Password <span class="required">*</span></label>
                                                            <input required="" class="form-control square" name="newPassword" id="newPassword" type="password">
                                                        </div>
                                                        <div class="form-group col-md-12">
                                                            <label>Confirm Password <span class="required">*</span></label>
                                                            <input required="" class="form-control square" name="confirmPassword" id="confirmPassword" type="password">
                                                        </div>
                                                        <div class="col-md-12">
                                                            <button type="submit" onclick="validatePassword(event)" class="btn btn-fill-out submit" name="submit" value="Submit">Save</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>