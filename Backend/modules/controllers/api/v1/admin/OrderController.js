const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class OrderController extends Controller {
    updateOrder(req, res) {
          let listFields={};
          if(req.body.statusOrder){ listFields.statusOrder=req.body.statusOrder}
          if(req.body.postTrackingCode){ listFields.postTrackingCode=req.body.postTrackingCode}
          req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
          if (this.showValidationErrors(req, res))
              return;
          this.model.Basket.findByIdAndUpdate(req.params.id,listFields, (err, Basket) => {
              if (err) throw err;
              if (Basket) {
                  return res.json({
                      data: 'اطلاعات  با موفقیت بروز رسانی شد',
                      success: true
                  });
              }
              res.status(404).json({
                  data: 'چنین اطلاعاتی وجود ندارد',
                  success: false
              });
  
          });
    }

    deleteOrder(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Basket.findByIdAndRemove(req.params.id, (err, Basket) => {
            if (err) throw err;
            if (Basket) {
                return res.json({
                    data: ' با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: ' وجود ندارد',
                success: false
            });
        });
    }

    getAllOrder(req, res) {
        this.model.Basket.find()
        .populate({path: 'User Product'})
        .exec((err, Basket) => {
            if (err) throw err;
            if (Basket) {
                return res.json({
                    data: Basket,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

      getOrder(req, res) {
        this.model.Basket.find({_id:req.params.id}).sort({date:-1})
        .populate({path: 'User Product'})
        .exec((err, Basket) => {
            if (err) throw err;
            if (Basket) {
                return res.json({
                    data: Basket,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }
    
 

}
