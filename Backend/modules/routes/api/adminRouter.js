const express = require('express');
const router = express.Router();
const adminRouter = express.Router();

// middlewares
const apiAuthAdminUser = require('./middleware/apiAuthAdmin');
const apiAuth = require('./middleware/apiAuth');
const apiAdmin = require('./middleware/apiAdmin');
const { uploadImage } = require('./middleware/UploadMiddleware');
const { uploadFiles } = require('./middleware/UploadMiddleware');

//user Controllers
const { api: ControllerApi } = config.path.controllers;
//admin controller
const AdminAuthController = require(`${ControllerApi}/v1/admin/AuthController`);
const AdminUploadController = require(`${ControllerApi}/v1/admin/UploadController`);
const ProductController = require(`${ControllerApi}/v1/admin/ProductController`);
const SliderController = require(`${ControllerApi}/v1/admin/SliderController`);
const CategoryController = require(`${ControllerApi}/v1/admin/CategoryController`);
const CommentController = require(`${ControllerApi}/v1/admin/CommentController`);
const UserController = require(`${ControllerApi}/v1/admin/UserController`);
const SubscriptionController = require(`${ControllerApi}/v1/admin/SubscriptionController`);
const DiscountController = require(`${ControllerApi}/v1/admin/DiscountController`);
const OrderController = require(`${ControllerApi}/v1/admin/OrderController`);
const NewsController = require(`${ControllerApi}/v1/admin/NewsController`);
const ContactUsController = require(`${ControllerApi}/v1/admin/ContactUsController`);
const HomePageController = require(`${ControllerApi}/v1/admin/HomePageController`);
const TicketController = require(`${ControllerApi}/v1/admin/TicketController`);


//upload
adminRouter.post('/upload', uploadImage.single('file'), AdminUploadController.uploadImage.bind(AdminUploadController));
//multi file
adminRouter.post('/multiUpload',uploadFiles,AdminUploadController.uploadFiles.bind(AdminUploadController));

//delete file uploaded in server
adminRouter.post('/deleteFile',AdminUploadController.deleteFile.bind(AdminUploadController));
//ticket
adminRouter.post('/registerTicket',TicketController.registerTicket.bind(TicketController));
adminRouter.get('/getAllTicket',TicketController.getAllTicket.bind(TicketController));
adminRouter.get('/countTicket',TicketController.countTicket.bind(TicketController));
adminRouter.put('/replyTicket/:id',TicketController.replyTicket.bind(TicketController));

//home page 
adminRouter.get('/getAllFaq',HomePageController.getAllFaq.bind(HomePageController));
adminRouter.delete('/deleteFaq/:id',HomePageController.deleteFaq.bind(HomePageController));
adminRouter.post('/registerFaq',HomePageController.registerFaq.bind(HomePageController));
adminRouter.get('/getCatalog',HomePageController.getCatalog.bind(HomePageController));
adminRouter.post('/registerCatalog',HomePageController.registerCatalog.bind(HomePageController));
adminRouter.delete('/deleteCatalog/:id',HomePageController.deleteCatalog.bind(HomePageController));
adminRouter.get('/getSendCost',HomePageController.getSendCost.bind(HomePageController));
adminRouter.post('/registerSendCost',HomePageController.registerSendCost.bind(HomePageController));
//contact us
adminRouter.get('/getAllContactUs',ContactUsController.getAllContactUs.bind(ContactUsController));
adminRouter.delete('/deleteContactUs/:id',ContactUsController.deleteContactUs.bind(ContactUsController));
adminRouter.get('/getContactUs/:id',ContactUsController.getContactUs.bind(ContactUsController));

//auth admin
adminRouter.post('/loginAdmin', AdminAuthController.loginAdmin.bind(AdminAuthController));
adminRouter.post('/registerAdmin', AdminAuthController.registerAdmin.bind(AdminAuthController));
adminRouter.put('/updateAdmin/:id', AdminAuthController.updateAdmin.bind(AdminAuthController));
adminRouter.delete('/deleteAdmin/:id', AdminAuthController.deleteAdmin.bind(AdminAuthController));
adminRouter.get('/getAllAdmin', AdminAuthController.getAllAdmin.bind(AdminAuthController));

adminRouter.put('/changePassword/:id', AdminAuthController.changePassword.bind(AdminAuthController));
adminRouter.put('/changeUsername/:id', AdminAuthController.changeUsername.bind(AdminAuthController));
adminRouter.put('/resetPassword', AdminAuthController.resetPassword.bind(AdminAuthController));

//news
adminRouter.post('/registerNews', NewsController.registerNews.bind(NewsController));
adminRouter.get('/getNews', NewsController.getNews.bind(NewsController));
adminRouter.put('/updateNews/:id', NewsController.updateNews.bind(NewsController));
adminRouter.delete('/deleteNews/:id', NewsController.deleteNews.bind(NewsController));
adminRouter.get('/getAllNews', NewsController.getAllNews.bind(NewsController));

//user
adminRouter.post('/registerUser', UserController.registerUser.bind(UserController));
adminRouter.put('/updateUser/:id', UserController.updateUser.bind(UserController));
adminRouter.delete('/deleteUser/:id', UserController.deleteUser.bind(UserController));
adminRouter.get('/getUser/:id', UserController.getUser.bind(UserController));
adminRouter.get('/getAllUser', UserController.getAllUser.bind(UserController));

//comment
adminRouter.delete('/deleteComment/:id', CommentController.deleteComment.bind(CommentController));
adminRouter.get('/getAllComment', CommentController.getAllComment.bind(CommentController));
adminRouter.put('/activeOrDeactiveComment/:id', CommentController.activeOrDeactiveComment.bind(CommentController));
adminRouter.get('/countComment', CommentController.countComment.bind(CommentController));
adminRouter.put('/replyComment/:id', CommentController.replyComment.bind(CommentController));

//discount
adminRouter.post('/registerDiscount', DiscountController.registerDiscount.bind(DiscountController));
adminRouter.put('/updateDiscount/:id', DiscountController.updateDiscount.bind(DiscountController));
adminRouter.delete('/deleteDiscount/:id', DiscountController.deleteDiscount.bind(DiscountController));
adminRouter.get('/getAllDiscount', DiscountController.getAllDiscount.bind(DiscountController));
adminRouter.get('/getDiscount/:id', DiscountController.getDiscount.bind(DiscountController));

//order
adminRouter.put('/updateOrder/:id', OrderController.updateOrder.bind(OrderController));
adminRouter.delete('/deleteOrder/:id', OrderController.deleteOrder.bind(OrderController));
adminRouter.get('/getAllOrder', OrderController.getAllOrder.bind(OrderController));
adminRouter.get('/getOrder/:id', OrderController.getOrder.bind(OrderController));

//slider
adminRouter.get('/getAllColor', SliderController.getAllColor.bind(SliderController));
adminRouter.post('/registerColor', SliderController.registerColor.bind(SliderController));
adminRouter.delete('/deleteBanner/:id', SliderController.deleteBanner.bind(SliderController));
adminRouter.post('/registerBanner', SliderController.registerBanner.bind(SliderController));
adminRouter.post('/registerSlider', SliderController.registerSlider.bind(SliderController));
adminRouter.get('/getAllSlider', SliderController.getAllSlider.bind(SliderController));
adminRouter.get('/getAllBanner', SliderController.getAllBanner.bind(SliderController));
adminRouter.get('/getSlider/:id', SliderController.getSlider.bind(SliderController));
adminRouter.put('/updateSlider/:id', SliderController.updateSlider.bind(SliderController));
adminRouter.delete('/deleteSlider/:id', SliderController.deleteSlider.bind(SliderController));

//product
adminRouter.post('/registerProduct', ProductController.registerProduct.bind(ProductController));
adminRouter.get('/getProduct/:id', ProductController.getProduct.bind(ProductController));
adminRouter.get('/getAllProduct', ProductController.getAllProduct.bind(ProductController));
adminRouter.put('/updateProduct/:id', ProductController.updateProduct.bind(ProductController));
adminRouter.delete('/deleteProduct/:id', ProductController.deleteProduct.bind(ProductController));

//category
adminRouter.post('/registerCategory', CategoryController.registerCategory.bind(CategoryController));
adminRouter.get('/getAllCategory', CategoryController.getAllCategory.bind(CategoryController));
adminRouter.put('/updateCategory/:id', CategoryController.updateCategory.bind(CategoryController));
adminRouter.delete('/deleteCategory/:id', CategoryController.deleteCategory.bind(CategoryController));

//sub category
adminRouter.post('/registerSubCategory', CategoryController.registerSubCategory.bind(CategoryController));
adminRouter.get('/getAllSubCategory/:id', CategoryController.getAllSubCategory.bind(CategoryController));
adminRouter.put('/updateSubCategory/:id', CategoryController.updateSubCategory.bind(CategoryController));
adminRouter.delete('/deleteSubCategory/:id', CategoryController.deleteSubCategory.bind(CategoryController));
//sub sub category
adminRouter.post('/registerSubSubCategory', CategoryController.registerSubSubCategory.bind(CategoryController));
adminRouter.get('/getAllSubSubCategory/:id', CategoryController.getAllSubSubCategory.bind(CategoryController));
adminRouter.put('/updateSubSubCategory/:id', CategoryController.updateSubSubCategory.bind(CategoryController));
adminRouter.delete('/deleteSubSubCategory/:id', CategoryController.deleteSubSubCategory.bind(CategoryController));
//subscription
adminRouter.get('/getSmsSubscription', SubscriptionController.getSmsSubscription.bind(SubscriptionController));
adminRouter.get('/getEmailSubscription', SubscriptionController.getEmailSubscription.bind(SubscriptionController));
adminRouter.delete('/deleteSmsSubscription/:id', SubscriptionController.deleteSmsSubscription.bind(SubscriptionController));
adminRouter.delete('/deleteEmailSubscription/:id', SubscriptionController.deleteEmailSubscription.bind(SubscriptionController));


router.use('', adminRouter);
module.exports = router;
