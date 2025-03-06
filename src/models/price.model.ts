import mongoose from 'mongoose';

const PriceSchema = new mongoose.Schema({

    content: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Content'
    },

    title: {
        type: String,
        trim: true,
        required: true,
        maxLength: 100
    },

    description: {
        type: String,
        maxLength: 500
    },

    features: {
        type: Object
    },

    unit: {
        type: String,
        trim: true,
        default: 'article',
        enum: ['monthly', 'annually', 'quantity']
    },

    price: {
        type: Number,
        default: true
    },

    isActive: {
        type: Boolean,
        default: true
    },
}, {
    collection: 'prices',
    timestamps: true
})

PriceSchema.pre(['save'], async function (next) {

    next()
})

export default mongoose.model('Price', PriceSchema)
