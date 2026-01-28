const mongoose = require('mongoose');

const ClaimSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        deal: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal', required: true },
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
        claimedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

ClaimSchema.index({ user: 1, deal: 1 }, { unique: true });

module.exports = mongoose.model('Claim', ClaimSchema);
