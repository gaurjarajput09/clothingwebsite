const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
    // TOPS
    { name: 'Premium Casual Top', price: 1299, image: '/images/top6.webp', category: 'Tops', description: 'Premium quality casual top' },
    { name: 'Chic Summer Top', price: 999, image: '/images/women_top.png', category: 'Tops', description: 'Chic summer wear' },
    { name: 'Elegant Floral Top', price: 499, image: '/images/top4.webp', category: 'Tops', description: 'Elegant floral design' },
    { name: 'Boho Style Top', price: 899, image: '/images/top3.webp', category: 'Tops', description: 'Bohemian style' },
    { name: 'Classic White Top', price: 1199, image: '/images/top2.webp', category: 'Tops', description: 'Timeless white top' },
    { name: 'Vibrant Party Top', price: 699, image: '/images/top1.webp', category: 'Tops', description: 'Vibrant party wear' },
    { name: 'Modern Fit Top', price: 980, image: '/images/top8.webp', category: 'Tops', description: 'Modern fit design' },
    { name: 'Relaxed Fit Top', price: 599, image: '/images/top5.webp', category: 'Tops', description: 'Relaxed fit casual' },
    
    // T-SHIRTS
    { name: 'Basic Cotton T-Shirt', price: 499, image: '/images/tshirt1.webp', category: 'T-Shirts', description: '100% Cotton' },
    { name: 'Graphic T-Shirt', price: 699, image: '/images/tshirt2.webp', category: 'T-Shirts', description: 'Cool graphics' },
    { name: 'Oversized T-Shirt', price: 799, image: '/images/tshirt3.webp', category: 'T-Shirts', description: 'Trendy oversized' },
    { name: 'Striped T-Shirt', price: 899, image: '/images/tshirt4.webp', category: 'T-Shirts', description: 'Classic stripes' },
    { name: 'U-Neck T-Shirt', price: 599, image: '/images/tshirt5.webp', category: 'T-Shirts', description: 'Stylish U-neck' },
    { name: 'Summer T-Shirt', price: 549, image: '/images/tshirt6.webp', category: 'T-Shirts', description: 'Perfect for summer' },

    // JEANS
    { name: 'High Waist Denim', price: 2499, image: '/images/women_jeans.png', category: 'Jeans', description: 'High waist fit' },
    { name: 'Bootcut Jeans', price: 1899, image: '/images/women_jeans.png', category: 'Jeans', description: 'Classic bootcut' },
    { name: 'Straight Fit Jeans', price: 1499, image: '/images/jeans1.jpg', category: 'Jeans', description: 'Straight fit' },
    { name: 'Skinny Fit Denim', price: 999, image: '/images/jeans2.jpg', category: 'Jeans', description: 'Skinny fit' },
    { name: 'Ripped Jeans', price: 1299, image: '/images/jeans3.jpg', category: 'Jeans', description: 'Stylish ripped' },
    { name: 'Vintage Jeans', price: 1499, image: '/images/jeans4.jpg', category: 'Jeans', description: 'Vintage look' },
    { name: 'Mom Jeans', price: 899, image: '/images/jeans5.jpg', category: 'Jeans', description: 'Classic mom jeans' },
    { name: 'Wide Leg Jeans', price: 1799, image: '/images/jeans6.jpg', category: 'Jeans', description: 'Wide leg fit' },
    { name: 'Cargo Jeans', price: 1099, image: '/images/jeans7.jpg', category: 'Jeans', description: 'Cargo style' },
    { name: 'Slim Fit Jeans', price: 2499, image: '/images/jeans8.jpg', category: 'Jeans', description: 'Slim fit' },
    { name: 'Casual Denim', price: 1600, image: '/images/jeans9.jpg', category: 'Jeans', description: 'Casual wear' },
    { name: 'Distressed Jeans', price: 2200, image: '/images/jeans10.jpg', category: 'Jeans', description: 'Distressed look' },

    // CROP TOPS
    { name: 'Classic Crop Top', price: 799, image: '/images/croptop1.webp', category: 'Crop Tops', description: 'Classic design' },
    { name: 'Ribbed Crop Top', price: 899, image: '/images/croptop2.webp', category: 'Crop Tops', description: 'Ribbed texture' },
    { name: 'Printed Crop Top', price: 699, image: '/images/croptop3.webp', category: 'Crop Tops', description: 'Cool prints' },
    { name: 'Floral Crop Top', price: 999, image: '/images/croptop4.webp', category: 'Crop Tops', description: 'Floral patterns' },
    { name: 'Solid Crop Top', price: 749, image: '/images/croptop5.webp', category: 'Crop Tops', description: 'Solid colors' },
    { name: 'Casual Crop Top', price: 849, image: '/images/croptop6.webp', category: 'Crop Tops', description: 'Everyday wear' },
    { name: 'Party Wear Crop Top', price: 1199, image: '/images/croptop7.webp', category: 'Crop Tops', description: 'Party special' },
    { name: 'V-Neck Crop Top', price: 1099, image: '/images/croptop8.webp', category: 'Crop Tops', description: 'V-neck style' },
    { name: 'Knit Crop Top', price: 999, image: '/images/croptop9.webp', category: 'Crop Tops', description: 'Knitted fabric' },
    { name: 'Summer Crop Top', price: 799, image: '/images/croptop10.webp', category: 'Crop Tops', description: 'Summer special' },
    { name: 'Trendy Crop Top', price: 699, image: '/images/croptop12.webp', category: 'Crop Tops', description: 'Latest trend' },
    { name: 'Artistic Crop Top', price: 699, image: '/images/croptop11.webp', category: 'Crop Tops', description: 'Artistic print' },

    // SHORT DRESSES
    { name: 'Party Short Dress', price: 1499, image: '/images/women_short_dress.png', category: 'Short Dresses', description: 'Perfect for parties' },
    { name: 'Velvet Short Dress', price: 1299, image: '/images/short1.webp', category: 'Short Dresses', description: 'Luxury velvet' },
    { name: 'Satin Mini Dress', price: 599, image: '/images/short2.webp', category: 'Short Dresses', description: 'Smooth satin' },
    { name: 'Sequined Dress', price: 1900, image: '/images/short3.webp', category: 'Short Dresses', description: 'Shiny sequins' },
    { name: 'Bodycon Mini', price: 1500, image: '/images/short4.webp', category: 'Short Dresses', description: 'Bodycon fit' },
    { name: 'Floral Mini Dress', price: 2900, image: '/images/short6.webp', category: 'Short Dresses', description: 'Floral mini' },
    { name: 'Cocktail Dress', price: 800, image: '/images/short5.webp', category: 'Short Dresses', description: 'Cocktail party' },
    { name: 'Fit & Flare Mini', price: 3499, image: '/images/short7.webp', category: 'Short Dresses', description: 'Fit and flare' },
    { name: 'Little Black Dress', price: 2800, image: '/images/short11.webp', category: 'Short Dresses', description: 'Timeless LBD' },
    { name: 'Elegant Mini', price: 3569, image: '/images/short8.webp', category: 'Short Dresses', description: 'Elegant design' },
    { name: 'Summer Mini Dress', price: 3499, image: '/images/short9.webp', category: 'Short Dresses', description: 'Summer mini' },
    { name: 'Wrap Mini Dress', price: 1999, image: '/images/short10.webp', category: 'Short Dresses', description: 'Wrap style' },

    // LONG DRESSES
    { name: 'Floral Maxi Dress', price: 2999, image: '/images/women_long_dress.png', category: 'Long Dresses', description: 'Elegant maxi' },
    { name: 'Evening Gown', price: 2999, image: '/images/long1.webp', category: 'Long Dresses', description: 'Formal evening wear' },
    { name: 'Bohemian Maxi', price: 2999, image: '/images/long2.webp', category: 'Long Dresses', description: 'Boho style maxi' },
    { name: 'Satin Maxi Dress', price: 2999, image: '/images/long3.webp', category: 'Long Dresses', description: 'Satin finish' },
    { name: 'Chiffon Gown', price: 2999, image: '/images/long4.webp', category: 'Long Dresses', description: 'Chiffon fabric' },
    { name: 'Summer Maxi', price: 2999, image: '/images/long5.webp', category: 'Long Dresses', description: 'Summer vibes' },
    { name: 'Floral Print Maxi', price: 2999, image: '/images/long6.webp', category: 'Long Dresses', description: 'Print maxi' },
    { name: 'Elegant Long Dress', price: 2999, image: '/images/long7.webp', category: 'Long Dresses', description: 'Elegant design' },
    { name: 'Formal Maxi', price: 2999, image: '/images/long8.webp', category: 'Long Dresses', description: 'Formal maxi' },
    { name: 'Designer Gown', price: 2999, image: '/images/long9.webp', category: 'Long Dresses', description: 'Designer wear' },
    { name: 'Luxury Maxi', price: 2999, image: '/images/long10.webp', category: 'Long Dresses', description: 'Luxury fabric' }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log(`Successfully Seeded ${products.length} Products! ✅`);
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
