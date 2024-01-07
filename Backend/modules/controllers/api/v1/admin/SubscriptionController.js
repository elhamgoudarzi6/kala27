const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class SubscriptionController extends Controller {

    getSmsSubscription(req, res) {
        this.model.SmsSubscription.find({}).exec((err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: result,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    getEmailSubscription(req, res) {
        this.model.EmailSubscription.find({}).exec((err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: result,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }
    
     deleteEmailSubscription(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.EmailSubscription.findByIdAndRemove(req.params.id, (err, EmailSubscription) => {
            if (err) throw err;
            if (EmailSubscription) {
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

  deleteSmsSubscription(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SmsSubscription.findByIdAndRemove(req.params.id, (err, SmsSubscription) => {
            if (err) throw err;
            if (SmsSubscription) {
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
