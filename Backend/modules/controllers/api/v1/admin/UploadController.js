const Controller = require(`${config.path.controller}/Controller`);
const imageToBase64 = require('image-to-base64');
module.exports = new class UploadController extends Controller {
    convertBit=() => {
        imageToBase64() // you can also to use url
            .then(
                (response) => {
                    console.log(response)
                    return response
                }
            )
            .catch(
                (error) => {
                    console.log(error); //Exepection error....
                }
            )
    }

    uploadFiles (req,res){
                if(req.files) {
            res.json({
                message : 'تصویر با موفقیت آپلود شد',
                imagePath : req.files,
                data :req.file,
                success : true,
            })
        } else {
            res.json({
                message : 'تصویر آپلود نشد',
                success : false
            })
        }
    }

    uploadImage(req, res) {
        if(req.file) { 
            ///let url=`http://api.jahantebkhoram.ir/` + req.file.path.replace(/\\/g , '/');
            res.json({
                message : 'تصویر با موفقیت آپلود شد',
               imagePath : `http://api.kala27.com/` + req.file.path.replace(/\\/g , '/'),
                data :req.file,
                success : true,
            })
        } else {
            res.json({
                message : 'تصویر آپلود نشد',
                success : false
            })
        }
    }

    uploadVideo(req, res) {
        if(req.file) {
            res.json({
                message : 'ویدیو با موفقیت آپلود شد',
                videoPath : `http://api.kala27.com/` + req.file.path.replace(/\\/g , '/'),
                data :req.file,
                success : true,
            })
        } else {
            res.json({
                message : 'ویدیو آپلود نشد',
                success : false
            })
        }
    }

    deleteFile(req, res) {
        var fs = require('fs');
        try {
            fs.unlink(('/home/kalacom1/server/public/uploads/'+req.body.path).replace(/\\/gi, '/'), function (err) {
	if (err) { 
	       return res.json({
                data: 'فایل موجود نیست',
                success: false
            })
	}
	 return res.json({
                data: 'فایل با موفقيت حذف شد',
                success: true
            })
});
           
        } catch (error) {
            return res.json({
               data: 'فایل موجود نیست',
                success: false
            })
        }
    }
}