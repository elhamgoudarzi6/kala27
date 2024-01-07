const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class OrderController extends Controller {
    updateOrder(req, res) {
          let listFields={};
          if(req.body.userID){ listFields.userID=req.body.userID}
          if(req.body.count){ listFields.count=req.body.count}
          if(req.body.date){ listFields.date=req.body.date}
          if(req.body.discountCode){ listFields.discountCode=req.body.discountCode}
          req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
          if (this.showValidationErrors(req, res))
              return;
          this.model.Basket.findByIdAndUpdate(req.params.id,listFields, (err, Order) => {
              if (err) throw err;
              if (Order) {
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
        this.model.Basket.findByIdAndRemove(req.params.id, (err, Order) => {
            if (err) throw err;
            if (Order) {
                return res.json({
                    data: 'محصول با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین محصولی وجود ندارد',
                success: false
            });
        });
    }

    getAllOrderByUser(req, res) {
        this.model.Basket.find({userID:req.params.id}).sort({date:-1})
        .populate({path: 'User Product'})
        .exec((err, Order) => {
            if (err) throw err;
            if (Order) {
                return res.json({
                    data: Order,
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
        .populate({path: 'User Product',populate:{path: 'Discount',model: 'Discount'}})
        .exec((err, Order) => {
            if (err) throw err;
            if (Order) {
                return res.json({
                    data: Order,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }
 getinfoRefID(req, res) {
        this.model.Basket.find({refID:req.params.refID}).sort({date:-1})
        .populate({path: 'User Product'})
        .exec((err, Order) => {
            if (err) throw err;
            if (Order) {
                return res.json({
                    data: Order,
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
