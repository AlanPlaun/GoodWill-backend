const jwt = require("jsonwebtoken");
const moment = require("moment");
class auth {
    createToken = (user) => {
        let payload = {
            userId: user.id,
            createAt: moment().unix(),
            expiresAt:moment().add(1,'day').unix()
        }
        return jwt.encode(payload,procces.env.TOKEN_KEY)
    }
}