const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/v1/UserTransform`);
const bcrypt = require('bcrypt');
const randomstring  = require('randomstring');
const nodemailer = require("nodemailer");
module.exports = new class AuthUserController extends Controller {
    getUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findById(req.params.id, (err, User) => {
            if (User) {
                return res.json({
                    data: User,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }
    
    registerUser(req, res) {
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findOne({mobile: req.body.mobile}, (err, User) => {
            if (err)  return res.json({
                data: err,
                success: false
            });
            if (User == null) {
                this.model.User({
                    mobile: req.body.mobile,
                    password: req.body.password,
                }).save(err => {
                    if (err) {
                        throw err;
                    }
                    return res.json({
                        data: 'کاربر با موفقیت ثبت  شد',
                        success: true
                    });
                })
            }
            else
                return res.json({
                    data: 'کاربری با این شماره همراه قبلاً ثبت نام شده است',
                    success: false
                });
    })
    }

    loginUser(req, res) {
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        req.checkBody('password', 'وارد کردن فیلد پسورد الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findOne({mobile: req.body.mobile}, (err, User) => {
            if (err) throw err;
            if (User == null)
                return res.json({
                    data: 'اطلاعات وارد شده صحیح نیست',
                    success: false
                });
            bcrypt.compare(req.body.password, User.password, (err, status) => {
                if (!status)
                    return res.json({
                        success: false,
                        data: 'پسورد وارد شده صحیح نمی باشد'
                    })
                return res.json({
                    data: new UserTransform().transform(User, true),
                    success: true
                });
            })
        })
    }

    updateUser(req, res) {
        let listFields={};
        if(req.body.fullName){ listFields.fullName=req.body.fullName}
        if(req.body.nationalCode){ listFields.nationalCode=req.body.nationalCode}
        if(req.body.phone){ listFields.phone=req.body.phone}
        if(req.body.email){ listFields.email=req.body.email}
        if(req.body.country){ listFields.country=req.body.country}
        if(req.body.state){ listFields.state=req.body.state}
        if(req.body.city){ listFields.city=req.body.city}
        if(req.body.address){ listFields.address=req.body.address}
        if(req.body.postalCode){ listFields.postalCode=req.body.postalCode}
        if(req.body.image){ listFields.image=req.body.image}
        if(req.body.birthDate){ listFields.birthDate=req.body.birthDate}
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findByIdAndUpdate(req.params.id,listFields, (err, User) => {
            if (err) throw err;
            if (User) {
                return res.json({
                    data: 'اطلاعات کاربر با موفقیت بروز رسانی شد',
                    success: true
                });
            }
         return res.json({
                data: 'چنین کاربری وجود ندارد',
                success: false
            });

        });
    }

    deleteUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findByIdAndRemove(req.params.id, (err, User) => {
            if (err) throw err;
            if (User) {
                return res.json({
                    data: ' با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین کاربری وجود ندارد',
                success: false
            });
        });
    }

    changePassword(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        req.checkBody('password', 'وارد کردن فیلد پسورد الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        let hash = bcrypt.hashSync(req.body.password, 10);
        this.model.User.findByIdAndUpdate(req.params.id, {
            password: hash,
        }, (err, User) => {
            if (err) throw err;
            if (User) {
                return res.json({
                    data: 'رمز عبور با موفقیت تغییر یافت',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین کاربری وجود ندارد',
                success: false
            });
        });
    }

    resetPassword(req, res) {
        let newpassword = randomstring.generate({charset: '123456789', length: 8});
        let hash = bcrypt.hashSync(newpassword, 10);
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findOneAndUpdate({mobile: req.body.mobile}, {password: hash}, (err, User) => {
            if (err) throw err;
            if (User) {
                return res.json({
                    data: 'اطلاعات با موفقیت آپدیت شد',
                    newpass: newpassword,
                    success: true
                });
            }
            return res.json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }
    
    async  sendCodeToEmail(req, res) {
        let code = randomstring.generate({charset: 'jahanteb', length: 8});
        req.checkBody('email', 'وارد کردن فیلد ایمیل الزامیست').notEmpty();
        let transporter = nodemailer.createTransport({
            host: 'everest.pws-dns.net',
            port: 587,
            secure: false,
            requireTLS: false,
            auth: {
                user: '_mainaccount@jahantebkhoram.ir',
                pass: 'i7j3I5YIuK1w'
            },
        });
        let mailOptions = {
            from: 'info@jahantebkhoram.ir',
            to:req.body.email,
            subject: "کد تایید شرکت جهان طب خرم",
            html:`<h2>${code}</h2><b>کد تایید شرکت جهان طب خرم</b>`,
        }
        await transporter.sendMail(mailOptions, function (err, info) {
            if (err) throw err;
            else{
                return res.json({
                    data: 'کد تایید با موفقیت ایمیل شد',
                    code:code,
                    info:info.response,
                    success: true
                });
            }
            res.status(404).json({
                data: 'ناموفق',
                success: false
            });
        });
    }
    
    
        findMobile(req, res) {
       req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
       if (this.showValidationErrors(req, res))
           return;
       this.model.User.findOne({mobile:req.body.mobile}, (err, User) => {
           if (err) throw err;
           if (User) {
               return res.json({
                   data: 'با این شماره قبلا ثبت نام شده است',
                   success: true
               });
           } else {
               return res.json({
                   data: 'این شماره موجود نیست',
                   success: false
               });
           }
       });
   }
    changeMobileNumber(req,res){
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        req.checkBody('mobile', 'وارد کردن فیلد شماره همراه الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findByIdAndUpdate(req.params.id, {
            mobile: req.body.mobile,
        }, (err, User) => {
            if (err) throw err;
            if (User) {
                return res.json({
                    data: 'شماره همراه با موفقیت تغییر یافت',
                    success: true
                });
            }
    res.status(404).json({
        data: 'چنین کاربری وجود ندارد',
        success: false
    });
});
}
}
