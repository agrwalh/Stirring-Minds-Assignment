const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Deal = require('./models/Deal');
const User = require('./models/User');
const Claim = require('./models/Claim');

dotenv.config();
connectDB();

const deals = [
    {
        title: 'CloudScale Pro - 50% Off',
        description: 'Get 50% off for the first year on all CloudScale Pro plans.',
        companyName: 'CloudScale',
        category: 'Cloud Services',
        discountCode: 'SCALE50',
        expiryDate: new Date('2025-12-31'),
        isLocked: false,
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    },
    {
        title: 'Analytix Premium - Free 3 Months',
        description: 'Advanced analytics for your SaaS.',
        companyName: 'Analytix',
        category: 'Analytics',
        discountCode: 'FREE3MO',
        expiryDate: new Date('2025-06-30'),
        isLocked: true,
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    },
    {
        title: 'DevToolKit - Lifetime Access',
        description: 'The ultimate developer toolkit.',
        companyName: 'DevTools Inc',
        category: 'Productivity',
        discountCode: 'LIFETIME2024',
        expiryDate: new Date('2024-12-31'),
        isLocked: true,
        imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
    },
    {
        title: 'Markeeter AI - 20% Off',
        description: 'AI-driven marketing automation.',
        companyName: 'Markeeter',
        category: 'Marketing',
        discountCode: 'AI20OFF',
        expiryDate: new Date('2025-01-01'),
        isLocked: false,
        imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80',
    },
    {
        title: 'SecureNet - Enterprise Plan',
        description: 'Top-tier security for your enterprise applications.',
        companyName: 'SecureNet',
        category: 'Security',
        discountCode: 'SECUREENT',
        expiryDate: new Date('2025-12-31'),
        isLocked: true,
        imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
    }
];

const importData = async () => {
    try {
        await Deal.deleteMany();
        await Claim.deleteMany(); // Clear old claims to prevent orphans
        await Deal.insertMany(deals);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Deal.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
