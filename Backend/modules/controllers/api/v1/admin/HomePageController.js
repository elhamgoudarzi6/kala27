const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class HomePageController extends Controller {
        getSendCost(req, res) {
        this.model.SendCost.find({}).exec((err, SendCost) => {
            if (err) throw err;
            if (SendCost) {
                return res.json({
                    data: SendCost,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }
      registerSendCost(req, res) {
      this.model.SendCost.deleteMany({}, (err, SendCost) => {
            if (err) throw err;
            if (SendCost) {
            let newSendCost = new this.model.SendCost({cost:req.body.cost,})
            newSendCost.save(err => {
            if (err) throw err;
            return res.json({
                data: ' با موفقیت ثبت شد',
                success: true
            });
            })
       }
      })
      }
    
    getAllFaq(req, res) {
        this.model.Faq.find({}).exec((err, Faq) => {
            if (err) throw err;
            if (Faq) {
                return res.json({
                    data: Faq,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    registerFaq(req, res) {
        req.checkBody('question', '  فیلد سوال نمیتواند خالی بماند').notEmpty();
        req.checkBody('reply', '  فیلد جواب نمیتواند خالی بماند').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        let newFaq = new this.model.Faq({
            question:req.body.question,
            reply:req.body.reply,
        })
        newFaq.save(err => {
            if (err)  return res.json({
                data: 'خطا',
                success: false
            });
            return res.json({
                data: ' با موفقیت ثبت شد',
                success: true
            });
        })
    }


    deleteFaq(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Faq.findByIdAndRemove(req.params.id, (err, Faq) => {
            if (err) throw err;
            if (Faq) {
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

    registerCatalog(req, res) {
        req.checkBody('path', '  فیلد ادرس نمیتواند خالی بماند').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        let newCatalog = new this.model.Catalog({
            path:req.body.path,
        })
        newCatalog.save(err => {
            if (err)  return res.json({
                data: 'خطا',
                success: false
            });
            return res.json({
                data: ' با موفقیت ثبت شد',
                success: true
            });
        })
    }
    
      getCatalog(req, res) {
        this.model.Catalog.find({}).exec((err, Catalog) => {
            if (err) throw err;
            if (Catalog) {
                return res.json({
                    data: Catalog,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }
  
    deleteCatalog(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Catalog.findByIdAndRemove(req.params.id, (err, Catalog) => {
            if (err) throw err;
            if (Catalog) {
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

  
}
