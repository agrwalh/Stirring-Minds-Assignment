const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        companyName: { type: String, required: true },
        category: { type: String, required: true },
        discountCode: { type: String, required: true },
        expiryDate: { type: Date, required: true },
        isLocked: { type: Boolean, default: false },
        imageUrl: { type: String, required: true },
    },
    { timestamps: true }
);

DealSchema.index({ category: 1, isLocked: 1 });

module.exports = mongoose.model('Deal', DealSchema);
