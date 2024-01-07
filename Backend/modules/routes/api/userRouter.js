const express = require('express');
const router = express.Router();
const adminRouter = express.Router();

// middlewares
const apiAuthAdminUser = require('./middleware/apiAuthAdmin');
const apiAuth = require('./middleware/apiAuth');
const apiAdmin = require('./middleware/apiAdmin');
const { uploadImage } = require('./middleware/UploadMiddleware');

//user Controllers
const { api: ControllerApi } = config.path.controllers;
const UploadController = require(`${ControllerApi}/v1/user/UploadController`);
const AuthUserController = require(`${ControllerApi}/v1/user/AuthUserController`);
const CommentController = require(`${ControllerApi}/v1/user/CommentController`);
const SubscriptionController = require(`${ControllerApi}/v1/user/SubscriptionController`);
const CategoryController = require(`${ControllerApi}/v1/user/CategoryController`);
const ProductController = require(`${ControllerApi}/v1/user/ProductController`);
const OrderController = require(`${ControllerApi}/v1/user/OrderController`);
const NewsController = require(`${ControllerApi}/v1/user/NewsController`);
const ContactUsController = require(`${ControllerApi}/v1/user/ContactUsController`);
const HomePageController = require(`${ControllerApi}/v1/user/HomePageController`);
const SliderController = require(`${ControllerApi}/v1/user/SliderController`);
const PaymentController = require(`${ControllerApi}/v1/user/PaymentController`);
const TicketController = require(`${ControllerApi}/v1/user/TicketController`);

//upload 
router.post('/upload', uploadImage.single('file'), UploadController.uploadImage.bind(UploadController));
//multi file
// router.post('/multiUpload',uploadFiles,UploadController.uploadFiles.bind(UploadController));
//delete file uploaded in server
router.post('/deleteFile',UploadController.deleteFile.bind(UploadController));

router.get('/getAllSlider', SliderController.getAllSlider.bind(SliderController));
router.get('/getAllBanner', SliderController.getAllBanner.bind(SliderController));

//home page 
router.get('/getAllFaq', HomePageController.getAllFaq.bind(HomePageController));
router.get('/getCatalog',HomePageController.getCatalog.bind(HomePageController));
router.get('/getSendCost',HomePageController.getSendCost.bind(HomePageController));

//ticket
router.post('/registerTicket', TicketController.registerTicket.bind(TicketController));
router.get('/countTicket/:id', TicketController.countTicket.bind(TicketController));
router.get('/allTicketForUser/:id', TicketController.allTicketForUser.bind(TicketController));
router.put('/replyTicket/:id', TicketController.replyTicket.bind(TicketController));

// auth user
router.post('/registerUser', AuthUserController.registerUser.bind(AuthUserController));
router.post('/loginUser', AuthUserController.loginUser.bind(AuthUserController));
router.put('/updateUser/:id', AuthUserController.updateUser.bind(AuthUserController));
router.get('/getUser/:id', AuthUserController.getUser.bind(AuthUserController));
router.delete('/deleteUser/:id', AuthUserController.deleteUser.bind(AuthUserController));

//changeMobileNumber
router.put('/changeMobileNumber/:id', AuthUserController.changeMobileNumber.bind(AuthUserController));
router.post('/findMobile', AuthUserController.findMobile.bind(AuthUserController));

//send email
router.post('/sendCodeToEmail', AuthUserController.sendCodeToEmail.bind(AuthUserController));

//contact us
router.post('/registerContactUs', ContactUsController.registerContactUs.bind(ContactUsController));

// order
router.delete('/deleteOrder/:id', OrderController.deleteOrder.bind(OrderController));
router.put('/updateOrder/:id', OrderController.updateOrder.bind(OrderController));
router.get('/getAllOrderByUser/:id', OrderController.getAllOrderByUser.bind(OrderController));
router.get('/getOrder/:id', OrderController.getOrder.bind(OrderController));
router.get('/getinfoRefID/:refID', OrderController.getinfoRefID.bind(OrderController));
//news 
router.get('/getNews/:id', NewsController.getNews.bind(NewsController));
router.get('/getAllNews', NewsController.getAllNews.bind(NewsController));
router.get('/getLatestNews', NewsController.getLatestNews.bind(NewsController));
router.get('/getAllTagNews', NewsController.getAllTagNews.bind(NewsController));

//password
router.put('/resetPassword', AuthUserController.resetPassword.bind(AuthUserController));
router.put('/changePassword/:id', AuthUserController.changePassword.bind(AuthUserController));


//comment
router.post('/registerComment', CommentController.registerComment.bind(CommentController));
router.get('/countComment/:id', CommentController.countComment.bind(CommentController));
router.get('/allCommentForProduct/:id', CommentController.allCommentForProduct.bind(CommentController));

//subscription
router.post('/addEmailSubscription', SubscriptionController.addEmailSubscription.bind(SubscriptionController));
router.post('/addSmsSubscription', SubscriptionController.addSmsSubscription.bind(SubscriptionController));

//category
router.get('/getAllCategory', CategoryController.getAllCategory.bind(CategoryController));
router.get('/getAllSubCategory/:id', CategoryController.getAllSubCategory.bind(CategoryController));
router.get('/getAllSubSubCategory/:id', CategoryController.getAllSubSubCategory.bind(CategoryController));

//product

router.get('/getAllProduct', ProductController.getAllProduct.bind(ProductController));
router.get('/getProduct/:id', ProductController.getProduct.bind(ProductController));


//allProductByCategoryID
router.get('/allProductByCategoryID/:id', ProductController.allProductByCategoryID.bind(ProductController));

//allProductBySubCategoryID
router.get('/allProductBySubCategoryID/:id', ProductController.allProductBySubCategoryID.bind(ProductController));

//advanceSearchProduct
router.post('/advanceSearchProduct', ProductController.advanceSearchProduct.bind(ProductController));

//discountProduct
router.get('/discountProduct', ProductController.discountProduct.bind(ProductController));

//newest Products
router.get('/newestProduct', ProductController.newestProduct.bind(ProductController));

//allProductBySearch
router.post('/allProductBySearch', ProductController.allProductBySearch.bind(ProductController));

//payment
router.post('/payment',PaymentController.payment.bind(PaymentController));
router.get('/payment/checker', PaymentController.checker.bind(PaymentController));
router.post('/updateProductInventory',PaymentController.updateProductInventory.bind(PaymentController));

router.use('', router);
module.exports = router;
