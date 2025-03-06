import mongoose from 'mongoose';
import User from './user.model';

const ApplicationFormSchema = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: true,
        maxLength: 100
    },

    lastName: {
        type: String,
        trim: true,
        required: true,
        maxLength: 100
    },

    email: {
        type: String,
        trim: true,
        maxLength: 100
    },

    phone: {
        type: String,
        maxLength: 100
    },

    country: {
        type: String,
        trim: true,
        maxLength: 100
    },

    city: {
        type: String,
        trim: true,
        maxLength: 100
    },

    program: {
        type: String,
        trim: true,
        maxLength: 100
    },

}, {
    collection: 'applicationForms',
    timestamps: true
})

export default mongoose.model('ApplicationForm', ApplicationFormSchema)