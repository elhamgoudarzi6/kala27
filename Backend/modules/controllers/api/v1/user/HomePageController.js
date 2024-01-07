const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class HomePageController extends Controller {
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

}
