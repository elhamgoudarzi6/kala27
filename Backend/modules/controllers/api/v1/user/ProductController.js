const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class ProductController extends Controller {
 
    getAllProduct(req, res) {
        this.model.Product.find().sort({updatedAt:-1})
        .populate({path: 'Category SubCategory SubSubCategory Comment Discount',populate:{path: 'User',model: 'User'}})
        .exec((err, Product) => {
            if (err) throw err;
            if (Product) {
                return res.json({
                    data: Product,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

        getProduct(req, res) {
        this.model.Product.find({ _id:req.params.id })
        .populate({path: 'Category SubCategory SubSubCategory Comment Discount',populate:{path: 'User',model: 'User'}})
        .exec((err, Product) => {
            if (err) res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
          
            if (Product) {
                return res.json({
                    data: Product,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    advanceSearchProduct(req, res) {
        let query = {};
        let sort='';
        if (req.body.categoryID) {
            query.categoryID = req.body.categoryID;
        }
        if (req.body.subCategoryID) {
            query.subCategoryID = req.body.subCategoryID;
        }
        if (req.body.subSubCategoryID) {
            query.subSubCategoryID = req.body.subSubCategoryID;
        }
        if (req.body.title) {
            query.title = req.body.title;
        }
        if (req.body.discountStatus) {
            query.discountStatus = req.body.discountStatus;
        }
       if (req.body.updatedAt) {
        sort={updatedAt:req.body.updatedAt};
        }
         if (req.body.price) {
        sort={price:req.body.price};
        }
       if (this.showValidationErrors(req, res))
           return;
        this.model.Product.find(query).sort(sort)
        .populate({path: 'Category SubCategory SubSubCategory Comment Discount'})
        .exec((err, Product) => {
            if (err) throw err;
            if (Product) {
                return res.json({
                    data: Product,
                    success: true
                });
            }        
        });
    }

    discountProduct(req, res) {
        this.model.Product.find({ discountStatus: true }).sort({title:-1}).limit(10)
        .populate({path: 'Category SubCategory Comment Discount'})
        .exec((err, Product) => {
            if (err) throw err;
            if (Product) {
                return res.json({
                    data: Product,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    newestProduct(req, res) {
        this.model.Product.find({}).sort({createdAt:-1}).limit(10)
        .populate({path: 'Category SubCategory SubSubCategory Comment Discount',populate:{path: 'User',model: 'User'}})
        .exec((err, Product) => {
            if (err)
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            if (Product) {
                return res.json({
                    data: Product,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });

    }

   allProductBySearch(req, res) {
        this.model.Product.find({title:{$regex:req.body.title}})
        .populate({path: 'Category SubCategory Comment Discount'})
        .exec((err, Product) => {
            if (err) throw err;
            if (Product) {
                return res.json({
                    data: Product,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    allProductByCategoryID(req, res) {
        this.model.Product.find({categoryID:req.params.id})
        .populate({path: 'Category SubCategory Comment Discount'})
        .exec((err, Product) => {
            if (err)
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            if (Product) {
                return res.json({
                    data: Product,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });

    }

    allProductBySubCategoryID(req, res) {
        this.model.Product.find({subCategoryID:req.params.id})
        .populate({path: 'Category SubCategory Comment Discount'})
        .exec((err, Product) => {
             console.log(Product)
            if (err) throw err;
            if (Product) {
                return res.json({
                    data: Product,
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
