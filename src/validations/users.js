import Joi from 'joi'

const schema = Joi.object(
    {
        email: Joi.string()
            .email()
            .required(),
        password:Joi.string()
            .min(6)
            .max(15)
            .required(),
        firstname: Joi.string()
            .required(),
        lastname: Joi.string()
            .required(),
        avatar: Joi.string()
            .required()
    }
)

export const schPassword = Joi.object(
    {
        passwordCurrent:Joi.string()
            .required(),
        passwordNew:Joi.string()
            .min(6)
            .max(15)
            .required()
    }
)

export default schema;

