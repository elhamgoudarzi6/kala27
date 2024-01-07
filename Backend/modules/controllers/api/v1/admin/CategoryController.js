const Controller = require(`${config.path.controller}/Controller`);

module.exports = new class CategoryController extends Controller {

    registerCategory(req, res) {
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Category({
            title: req.body.title,

        }).save(err => {
            if (err) {
                throw err;
            }

            return res.json({
                data: 'دسته سطح یک با موفقیت ثبت  شد',
                success: true
            });
        });
    }

    registerSubCategory(req, res) {
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        req.checkBody('categoryID', 'وارد کردن فیلد کد  دسته الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubCategory({
            categoryID: req.body.categoryID,
            title: req.body.title,
        }).save(err => {
            if (err) {
                throw err;
            }
            return res.json({
                data: 'دسته سطح دو با موفقیت ثبت  شد',
                success: true
            });
        });
    }


    registerSubSubCategory(req, res) {
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        req.checkBody('subCategoryID', 'وارد کردن فیلد کد  زیر دسته الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubSubCategory({
            subCategoryID: req.body.subCategoryID,
            title: req.body.title,
        }).save(err => {
            if (err) {
                throw err;
            }
            return res.json({
                data: 'دسته سطح سه با موفقیت ثبت  شد',
                success: true
            });
        });
    }
    
    updateCategory(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Category.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
        }, (err, Category) => {
            if (err) throw err;
            if (Category) {
                return res.json({
                    data: ' دسته سطح یک با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }
  
    updateSubCategory(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        req.checkBody('categoryID', 'وارد کردن فیلد کد  دسته الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubCategory.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            categoryID:req.body.categoryID
        }, (err, SubCategory) => {
            if (err) throw err;
            if (SubCategory) {
                return res.json({
                    data: '  دسته سطح دو با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }
    
     
    updateSubSubCategory(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        req.checkBody('subCategoryID', 'وارد کردن فیلد کد  زیر دسته الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubSubCategory.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            subCategoryID:req.body.subCategoryID
        }, (err, SubSubCategory) => {
            if (err) throw err;
            if (SubSubCategory) {
                return res.json({
                    data: '  دسته سطح سه با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    deleteCategory(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Category.findByIdAndRemove(req.params.id, (err, Category) => {
            if (err) throw err;
            if (Category) {
                return res.json({
                    data: 'دسته سطح یک با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    deleteSubCategory(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubCategory.findByIdAndRemove(req.params.id, (err,SubCategory) => {
            if (err) throw err;
            if (SubCategory) {
                return res.json({
                    data: 'دسته سطح دو با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }
    
     deleteSubSubCategory(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubSubCategory.findByIdAndRemove(req.params.id, (err,SubSubCategory) => {
            if (err) throw err;
            if (SubSubCategory) {
                return res.json({
                    data: 'دسته سطح سه با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

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
  
    searchParentSubCategory(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubCategory.findById(req.params.id, (err, SubCategory) => {
            if (SubCategory) {
                return res.json({
                    data: SubCategory,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }
    
}
