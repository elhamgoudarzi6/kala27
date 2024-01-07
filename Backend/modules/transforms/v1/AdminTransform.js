const Transform = require('./../Transform');
const jwt = require('jsonwebtoken');
module.exports = class AdminTransform extends Transform {
    transform(item , createToken = false) {
        this.createToken = createToken;
        return {
            'id':item.id,
            'username' : item.mobile,
            'password' : item.password,
            'adminName':item.adminName,
            'image':item.image,
            'type':item.type,
            ...this.withToken(item)
        }
    }
    withToken(item) {
        if(item.token)
            return { token : item.token}
        if(this.createToken) {
            let token = jwt.sign({ user_id : item._id } , config.secret , {
                expiresIn :  '110h',
            });
            return { token }
        }
        return {};
    }
}
