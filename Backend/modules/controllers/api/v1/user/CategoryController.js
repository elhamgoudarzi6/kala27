const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CategoryController extends Controller {

    getAllCategory(req, res) {
        this.model.Category.find()
            .populate({ path: 'SubCategory',populate:{path: 'SubSubCategory',model: 'SubSubCategory'}})
            .exec((err, Category) => {
                if (err) throw err;
                if (Category) {
                    return res.json({
                        data: Category,
                        success: true
                    });
                }
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            });
    }

    getAllSubCategory(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubCategory.find({ categoryID: req.params.id }).exec((err, SubCategory) => {
            if (err) throw err;
            if (SubCategory) {
                return res.json({
                    data: SubCategory,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }
    
        getAllSubSubCategory(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubSubCategory.find({ subCategoryID: req.params.id }).exec((err, SubSubCategory) => {
            if (err) throw err;
            if (SubSubCategory) {
                return res.json({
                    data: SubSubCategory,
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
