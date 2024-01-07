const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class SliderController extends Controller {
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
}