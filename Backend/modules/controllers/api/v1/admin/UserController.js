const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class UserController extends Controller {
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

    getAllUser(req, res) {
        this.model.User.find({} ,(err, User) => {
            if (User) {
                return res.json({
                    data: User,
                    success: true
                })
            }
            res.json({
                data: 'کاربر یافت نشد',
                success: false
            })
        })
    }
    
    updateUser(req, res) {
        let listFields={};
        if(req.body.fullName){ listFields.fullName=req.body.fullName}
        if(req.body.nationalCode){ listFields.nationalCode=req.body.nationalCode}
        if(req.body.phone){ listFields.phone=req.body.phone}
        if(req.body.country){ listFields.country=req.body.country}
        if(req.body.state){ listFields.state=req.body.state}
        if(req.body.city){ listFields.city=req.body.city}
        if(req.body.address){ listFields.address=req.body.address}
        if(req.body.postalCode){ listFields.postalCode=req.body.postalCode}
        if(req.body.image){ listFields.image=req.body.image}
        if(req.body.birthDate){ listFields.birthDate=req.body.birthDate}
        if(req.body.email){ listFields.email=req.body.email}
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
            res.status(404).json({
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
                    data: 'کاربر با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
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


}
