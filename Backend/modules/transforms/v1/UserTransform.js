const Transform = require('./../Transform');
const jwt = require('jsonwebtoken');

module.exports = class UserTransform extends Transform {
    transform(item , createToken = false) {
        this.createToken = createToken;
        return {
            'id':item.id,
            'mobile' : item.mobile,
            'password' : item.password,
            'fullName':item.fullName,
            'birthDate':item.birthDate,
            'country':item.country,
			'city':item.city,
			'state':item.state,
            'nationalCode':item.nationalCode,
            'phone':item.phone,
            'address':item.address,
            'postalCode':item.postalCode,
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
