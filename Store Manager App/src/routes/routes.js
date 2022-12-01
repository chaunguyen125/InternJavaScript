// const db=require('../config/postgres.config');
const author=require('../config/authorization.config');
const ProductController = require('../app/controllers/products.controller');
const StoreController = require('../app/controllers/stores.controller');
const OrderController = require('../app/controllers/order.controller');
const ChargeController = require('../app/controllers/charge.controller');
const CategoryController = require('../app/controllers/category.controller');
const BookingInformationController = require('../app/controllers/booking_information.controller');
const AuthenticationController = require('../app/controllers/authentication.controller');
const RoleController = require('../app/controllers/role.controller');
const TestController = require('../app/controllers/test.controller');

function route(app) {
    // Product
    app.post('/addProducts', ProductController.createProduct); //Create
    app.get('/products', ProductController.findProductsAdv); //Find
    app.put('/updateProduct/:product_name', ProductController.updateProduct); //Update
    app.post('/deleteProduct', ProductController.deleteProduct); //Delete

    app.post('/filterProduct', ProductController.readProductByHieusAct); //Read for Hieu bro
    app.get('/readProductByCategory', ProductController.readProductByCategory); //Read for Hieu bro
    
    //Store
    app.get('/findStores', StoreController.findStores); //Find
    app.post('/addStores', StoreController.createStore); //Create
    app.put('/updateStores/:id', StoreController.updateStore); //Update
    app.post('/deleteStores', StoreController.deleteStore); //Delete
    app.get('/readStores', StoreController.readStore); //Read

    //Order
    app.get('/orders', StoreController.findStores); //Find
    app.post('/addOrder', OrderController.createOrder); //Create
    app.put('/updateOrder/:id', OrderController.updateOrder); //Update
    app.post('/deleteOrder', OrderController.deleteOrder); //Delete
    app.get('/readOrder', OrderController.readOrder); //Read


    //Charge
    app.get('/findCharges', ChargeController.findCharge); //Find
    app.post('/addCharge', ChargeController.createCharge); //Create
    app.put('/updateCharge/:id', ChargeController.updateCharge); //Update
    app.post('/deleteCharge', ChargeController.deleteCharge); //Delete

    //Category
    app.get('/findCategory', CategoryController.findCategory); //Find
    app.post('/addCategory', CategoryController.createCategory); //Create
    app.put('/updateCategory/:id', CategoryController.updateCategory); //Update
    app.post('/deleteCategory', CategoryController.deleteCategory); //Delete

    //Booking Information
    app.get('/findBooking', BookingInformationController.findBookingInformation); //Find
    app.post('/addBooking', BookingInformationController.createBookingInformation); //Create
    app.put('/updateBooking/:id', BookingInformationController.updateBookingInformation); //Update
    app.post('/deleteBooking', BookingInformationController.deleteBookingInformation); //Delete

    //Authentication
    app.post('/signup', AuthenticationController.signUp);
    app.post('/login', AuthenticationController.logIn);
    app.get('/home',author.authorization, (req,res) => res.json('login success') );


    //Role
    app.post('/rolePermission', RoleController.rolePermission);

    //Test
    app.get('/test', TestController.test);

}

module.exports = route;