// const db=require('../config/postgres.config');
const author = require('../config/authorization.config');
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
    app.post('/addProducts', author.checkAuthorAdminRole, ProductController.createProduct); //Create
    app.get('/products', ProductController.findProductsAdv); //Find
    app.put('/updateProduct/:product_name', author.checkAuthorAdminRole, ProductController.updateProduct); //Update
    app.post('/deleteProduct', author.checkAuthorAdminRole, ProductController.deleteProduct); //Delete

    app.post('/filterProduct', ProductController.readProductByHieusAct); //Read for Hieu bro
    app.get('/readProductByCategory', ProductController.readProductByCategory); //Read for Hieu bro

    //Store
    app.get('/findStores', StoreController.findStores); //Find
    app.post('/addStores', author.checkAuthorAdminRole, StoreController.createStore); //Create
    app.put('/updateStores/:id', author.checkAuthorAdminRole, StoreController.updateStore); //Update
    app.post('/deleteStores', author.checkAuthorAdminRole, StoreController.deleteStore); //Delete
    app.get('/readStores', author.checkAuthorAdminRole, StoreController.readStore); //Read

    //Order
    app.get('/orders', StoreController.findStores); //Find
    app.post('/addOrder', author.checkAuthorAdminRole, OrderController.createOrder); //Create
    app.put('/updateOrder/:id', author.checkAuthorAdminRole, OrderController.updateOrder); //Update
    app.post('/deleteOrder', author.checkAuthorAdminRole, OrderController.deleteOrder); //Delete
    app.get('/readOrder', author.checkAuthorAdminRole, OrderController.readOrder); //Read


    //Charge
    app.get('/findCharges', ChargeController.findCharge); //Find
    app.post('/addCharge', author.checkAuthorAdminRole, ChargeController.createCharge); //Create
    app.put('/updateCharge/:id', author.checkAuthorAdminRole, ChargeController.updateCharge); //Update
    app.post('/deleteCharge', author.checkAuthorAdminRole, ChargeController.deleteCharge); //Delete

    //Category
    app.get('/findCategory', CategoryController.findCategory); //Find
    app.post('/addCategory', author.checkAuthorAdminRole, CategoryController.createCategory); //Create
    app.put('/updateCategory/:id', author.checkAuthorAdminRole, CategoryController.updateCategory); //Update
    app.post('/deleteCategory', author.checkAuthorAdminRole, CategoryController.deleteCategory); //Delete

    //Booking Information
    app.get('/findBooking', BookingInformationController.findBookingInformation); //Find
    app.post('/addBooking', author.checkAuthorAdminRole, BookingInformationController.createBookingInformation); //Create
    app.put('/updateBooking/:id', author.checkAuthorAdminRole, BookingInformationController.updateBookingInformation); //Update
    app.post('/deleteBooking', author.checkAuthorAdminRole, BookingInformationController.deleteBookingInformation); //Delete

    //Authentication
    app.post('/signup', AuthenticationController.signUp);
    app.post('/login', AuthenticationController.logIn);
    app.get('/home', author.authorization, (req, res) => res.json('login success'));
    app.get('/admin', author.checkAuthorAdminRole, (req, res) => res.json('access admin success'));


    //Role
    app.post('/rolePermission', RoleController.rolePermission);

    //Test
    app.get('/test', TestController.test);

}

module.exports = route;