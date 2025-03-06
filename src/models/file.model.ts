import mongoose from 'mongoose';
import User from './user.model';

const FileSchema = new mongoose.Schema({
    originalName: {
        type: String,
        trim: true,
        required: true,
        maxLength: 100
    },
    fileName: {
        type: String,
        trim: true,
        maxLength: 100
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, {
    collection: 'files',
    timestamps: true
})

export default mongoose.model('File', FileSchema)