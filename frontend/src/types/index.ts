export interface User {
    _id: string;
    name: string;
    email: string;
    isVerified: boolean;
    role: 'user' | 'admin';
}

export interface Deal {
    _id: string;
    title: string;
    description: string;
    companyName: string;
    category: string;
    discountCode: string;
    expiryDate: string;
    isLocked: boolean;
    imageUrl: string;
}

export interface Claim {
    _id: string;
    user: string;
    deal: Deal;
    status: 'pending' | 'approved' | 'rejected';
    claimedAt: string;
}
