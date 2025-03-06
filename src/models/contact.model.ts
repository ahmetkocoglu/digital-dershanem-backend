import mongoose from 'mongoose';
import User from './user.model';

const ContactSchema = new mongoose.Schema({

    name: {
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


    content: {
        type: String,
        trim: true,
        maxLength: 255
    },


    description: {
        type: String,
        trim: true,
        maxLength: 400
    },

}, {
    collection: 'contacts',
    timestamps: true
})

export default mongoose.model('Contact', ContactSchema)