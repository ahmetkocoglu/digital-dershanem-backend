import mongoose from 'mongoose';
import User from './user.model';

const ContentSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },

    category: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Content'
    }],

    type: {
        type: String,
        trim: true,
        required: true,
        maxLength: 10,
        default: 'article',
        enum: ['article', 'menu', 'footer', 'price', 'hero', 'blog', 'content', 'category', 'faq', 'home', 'slide', 'setting', 'social']
    },

    slug: {
        type: String,
        trim: true,
        required: true,
        maxLength: 255
    },

    title: {
        type: String,
        trim: true,
        required: true,
        maxLength: 255
    },

    description: {
        type: String,
        trim: true,
        maxLength: 400
    },

    tag: {
        type: String,
        trim: true,
        maxLength: 400
    },

    article: {
        type: Object,
        trim: true
    },

    isActive: {
        type: Boolean,
        default: true
    },
}, {
    collection: 'contents',
    timestamps: true
})

ContentSchema.pre(['save'], async function (next) {
    const data = this
    
    const user = await User.findOne()
    if (!data.user && user) {
        this.user = user._id;
    }
    next()
})

export default mongoose.model('Content', ContentSchema)