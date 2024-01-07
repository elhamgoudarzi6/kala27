// Model
const Admin= require(`${config.path.model}/admin`);
const User = require(`${config.path.model}/user`);
const Category = require(`${config.path.model}/category`);
const SubSubCategory=require(`${config.path.model}/subSubCategory`);
const SubCategory=require(`${config.path.model}/subCategory`);
const Product = require(`${config.path.model}/product`);
const Slider = require(`${config.path.model}/slider`);
const SmsSubscription=require(`${config.path.model}/smsSubscription`);
const EmailSubscription=require(`${config.path.model}/emailSubscription`);
const Comment=require(`${config.path.model}/comment`);
const Discount=require(`${config.path.model}/discount`);
const Order=require(`${config.path.model}/order`);
const News=require(`${config.path.model}/news`);
const ContactUs=require(`${config.path.model}/contactUs`);
const Faq=require(`${config.path.model}/faq`);
const Catalog=require(`${config.path.model}/catalog`);
const Inventory=require(`${config.path.model}/inventory`);
const Payment=require(`${config.path.model}/payment`);
const Banner=require(`${config.path.model}/banner`);
const Color=require(`${config.path.model}/color`);
const Basket=require(`${config.path.model}/basket`);
const Ticket=require(`${config.path.model}/ticket`);
const SendCost=require(`${config.path.model}/sendCost`);

module.exports = class Controller {
    constructor() {
        this.model = { Admin,User,Category,Product,Slider,
            EmailSubscription,SmsSubscription,
            Comment,SubCategory,SubSubCategory,Discount,Order,News,ContactUs,Faq,Catalog,Inventory,Payment,
            Banner,Color,Basket,Ticket,SendCost
        }
    }
    showValidationErrors(req, res, callback) {
        let errors = req.validationErrors();
        if (errors) {
            res.json({
                message: errors.map(error => {
                    return {
                        'field': error.param,
                        'message': error.msg
                    }
                }),
                success: false
            });
            return true;
        }
        return false
    }

    escapeAndTrim(req, items) {
        items.split(' ').forEach(item => {
            req.sanitize(item).escape();
            req.sanitize(item).trim();
        });
    }
}
