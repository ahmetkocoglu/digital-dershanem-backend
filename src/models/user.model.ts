import mongoose from 'mongoose';
import passwordEncrypt from '../helpers/passwordEncrypt';

const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true,
        maxLength: 100
    },

    password: {
        type: String,
        trim: true,
        required: true,
        maxLength: 100
    },

    name: {
        type: String,
        trim: true,
        maxLength: 100
    },

    token: {
        type: String,
        trim: true,
        index: true,
    }, 

    isActive: {
        type: Boolean,
        default: true
    },

    isStaff: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'users',
    timestamps: true
})

UserSchema.pre(['save'], function (next) {
    const data = this

    const isEmailValidated = data.email ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) : true

    if(isEmailValidated) {
        if(data?.password) {
            const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password)

            if(isPasswordValidated){
                data.password = passwordEncrypt(data.password)

                this.password = data.password
            } else {
                next(new Error('Password is not validated.'))
            }
        }
        next()
    } else {
        next(new Error('Email is not validated.'))
    }
})

export default mongoose.model('User', UserSchema)