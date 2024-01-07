const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class SliderController extends Controller {
    
        registerColor(req, res) {
        req.checkBody('code', 'کد رنگ را وارد کنید').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        let newColor = new this.model.Color({
            code:req.body.code,
            color:req.body.color
        })
        newColor.save(err => {
            if (err)  return res.json({
                data: 'خطا',
                success: false
            });
            return res.json({
                data: 'با موفقیت ثبت شد',
                success: true
            });
        })
    }
    
    
    getAllColor(req, res) {
        this.model.Color.find({}).exec((err, Color) => {
            if (err) throw err;
            if (Color) {
                return res.json({
                    data: Color,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }
    
    getAllSlider(req, res) {
        this.model.Slider.find({}).sort({ link: -1 }).exec((err, slider) => {
            if (err) throw err;
            if (slider) {
                return res.json({
                    data: slider,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    getSlider(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Slider.findById(req.params.id, (err, slider) => {
            if (slider) {
                return res.json({
                    data: slider,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }

    registerSlider(req, res) {
        req.checkBody('link', ' لینک اسلایدر نمیتواند خالی بماند').notEmpty();
        req.checkBody('imageurl', ' تصویر نمیتواند خالی بماند').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        let newSlider = new this.model.Slider({
            link:req.body.link,
            imageurl: req.body.imageurl,
             tag:req.body.tag,
        })
        newSlider.save(err => {
            if (err)  return res.json({
                data: 'خطا',
                success: false
            });
            return res.json({
                data: 'اسلایدر با موفقیت ثبت شد',
                success: true
            });
        })
    }

registerBanner(req, res) {
        req.checkBody('link', ' لینک اسلایدر نمیتواند خالی بماند').notEmpty();
        req.checkBody('imageurl', ' تصویر نمیتواند خالی بماند').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        let newBanner = new this.model.Banner({
            link:req.body.link,
            imageurl: req.body.imageurl,
             tag:req.body.tag,
        })
        newBanner.save(err => {
            if (err)  return res.json({
                data: 'خطا',
                success: false
            });
            return res.json({
                data: 'با موفقیت ثبت شد',
                success: true
            });
        })
    }

    deleteBanner(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Banner.findByIdAndRemove(req.params.id, (err, Banner) => {
            if (err) throw err;
            if (Banner) {
                return res.json({
                    data: 'با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }
    
    updateSlider(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Slider.findByIdAndUpdate(req.params.id, {
            link:req.body.link,
            tag:req.body.tag,
            imageurl: req.body.imageurl
        }, (err, slider) => {
            if (err) throw err;
            if (slider) {
                return res.json({
                    data: ' اسلاید با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }



 getAllBanner(req, res) {
        this.model.Banner.find({}).sort({ link: -1 }).exec((err, Banner) => {
            if (err) throw err;
            if (Banner) {
                return res.json({
                    data: Banner,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }
    
    deleteSlider(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Slider.findByIdAndRemove(req.params.id, (err, slider) => {
            if (err) throw err;
            if (slider) {
                return res.json({
                    data: 'اسلاید با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }
}
