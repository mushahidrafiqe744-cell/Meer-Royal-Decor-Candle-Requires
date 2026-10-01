import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'data', 'database.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

// Initial DB seed helper
function getInitialDb() {
  return {
    products: [
      {
        id: 'prod-1',
        name: 'Handmade Candles',
        nameUrdu: 'ہینڈ میڈ خوشبودار کینڈلز',
        category: 'scented-candles',
        price: 1850,
        originalPrice: 2200,
        image: '/src/assets/images/product_scented_candle_jar_1790775161737.jpg',
        description: 'Beautifully crafted, aesthetic and scented handmade candles to premium up your space.',
        scentNotes: ['French Vanilla', 'Smoked Amber', 'Warm Sandalwood'],
        burnTime: '45-50 Hours',
        dimensions: '8.5cm x 9.5cm (260g)',
        waxType: '100% Organic Soy & Coconut Wax',
        isBestSeller: false,
        isNewArrival: true,
        inStock: true,
        rating: 4.9,
        reviewsCount: 42,
        whatsappText: "Hi, I'm interested in Handmade Candles"
      },
      {
        id: 'prod-2',
        name: 'Party Decor',
        nameUrdu: 'پارٹی ڈیکوریشن اینڈ ایونٹس',
        category: 'party-decor',
        price: 6500,
        originalPrice: 8000,
        image: '/src/assets/images/product_party_decor_setup_1790775176807.jpg',
        description: 'Make your celebrations magical with our premium party decorations tailored for every occasion.',
        scentNotes: ['Custom Theme Colors', 'Fairy Lights Included', 'Same-day Setup in Lahore'],
        burnTime: 'Lasts entire event duration',
        dimensions: '6.5ft x 6.5ft Circular Arch',
        isBestSeller: true,
        isNewArrival: false,
        inStock: true,
        rating: 5.0,
        reviewsCount: 58,
        whatsappText: "Hi, I'm interested in Party Decor"
      },
      {
        id: 'prod-3',
        name: 'Theme Party Disposables',
        nameUrdu: 'تھیم پارٹی ڈسپوزایبل آئٹمز',
        category: 'disposables',
        price: 1450,
        originalPrice: 1750,
        image: '/src/assets/images/product_disposable_tableware_1790775193176.jpg',
        description: 'Plates, Cups, Napkins, and Balloons available in all kinds of exciting party themes!',
        scentNotes: ['Food Grade', 'Leak Proof', 'High Temperature Resistant'],
        burnTime: 'N/A',
        dimensions: '50-piece complete serving set',
        isBestSeller: false,
        isNewArrival: false,
        inStock: true,
        rating: 4.8,
        reviewsCount: 34,
        whatsappText: 'Hi, I m interested in Theme Party Disposable Items'
      },
      {
        id: 'prod-4',
        name: 'Happy Birthday Balloons Decor',
        nameUrdu: 'ہیپی برتھ ڈے بیلونز ڈیکوریشن',
        category: 'balloons',
        price: 4500,
        originalPrice: 5500,
        image: '/src/assets/images/product_party_decor_setup_1790775176807.jpg',
        description: 'Metallic colors aur gorgeous gold/silver backdrop wall designs ka complete collection.',
        scentNotes: ['Metallic Foil & Latex', 'Chrome Finish', 'Custom Color Theme'],
        burnTime: 'Event Duration',
        dimensions: 'Full Wall Backdrop Set',
        isBestSeller: true,
        isNewArrival: true,
        inStock: true,
        rating: 5.0,
        reviewsCount: 47,
        whatsappText: "Hi Tayyaba, I'm interested in Happy Birthday Balloons Decoration"
      },
      {
        id: 'prod-5',
        name: 'Partition Plates & Cups',
        nameUrdu: 'پارٹیشن پلیٹس اور پیپر کپس',
        category: 'disposables',
        price: 1200,
        originalPrice: 1450,
        image: '/src/assets/images/product_disposable_tableware_1790775193176.jpg',
        description: 'High-quality eco-friendly partition design plates aur high-grade paper cups events ke liye.',
        scentNotes: ['Heavy Duty', '3-Compartment Design', 'Eco-friendly'],
        burnTime: 'N/A',
        dimensions: 'Set of 25 Plates + 25 Cups',
        isBestSeller: false,
        isNewArrival: true,
        inStock: true,
        rating: 4.7,
        reviewsCount: 22,
        whatsappText: "Hi Tayyaba, I'm interested in Partition Plates and Paper Cups"
      },
      {
        id: 'prod-6',
        name: 'Luxury Yankee Candle Jars',
        nameUrdu: 'لگژری یانکی کینڈل جارز',
        category: 'luxury-jars',
        price: 2400,
        originalPrice: 2900,
        image: '/src/assets/images/hero_candle_lifestyle_editorial_1790853087024.jpg',
        description: 'Beautiful glass holder candles with deep aromatic fragrances jo mahool ko mehkadein.',
        scentNotes: ['French Lavender', 'Warm Vanilla', 'Arabian Amber'],
        burnTime: '60 Hours',
        dimensions: 'Large Glass Jar (350g)',
        waxType: '100% Organic Soy Wax',
        isBestSeller: true,
        isNewArrival: false,
        inStock: true,
        rating: 4.9,
        reviewsCount: 65,
        whatsappText: 'Hi Tayyaba, I interested in Luxury Yankee Candle Jars'
      },
      {
        id: 'prod-7',
        name: 'Sculptural Bubble Cube Candle Duo',
        nameUrdu: 'اسکلپچرل ببل کیوب ہینڈ میڈ کینڈل',
        category: 'bubble-candles',
        price: 1200,
        originalPrice: 1500,
        image: '/src/assets/images/product_luxury_bubble_candle_1790775202396.jpg',
        description: 'Aesthetic Scandinavian style geometric bubble cube candles. Pure natural beeswax blend with subtle lavender & cotton blossom delicate notes.',
        scentNotes: ['Midnight Lavender', 'Cotton Blossom', 'White Jasmine'],
        burnTime: '20-25 Hours each',
        dimensions: '6cm x 6cm x 6cm (Set of 2)',
        waxType: 'Beeswax & Soy Blend',
        isBestSeller: true,
        isNewArrival: false,
        inStock: true,
        rating: 4.9,
        reviewsCount: 54,
        whatsappText: 'Hi Tayyaba, I want to order Sculptural Bubble Cube Candles'
      },
      {
        id: 'prod-8',
        name: 'Royal Velvet Rose & Oud Scented Tin',
        nameUrdu: 'رائل ویلویٹ روز اینڈ عود پرفیوم کینڈل',
        category: 'scented-candles',
        price: 1350,
        originalPrice: 1600,
        image: '/src/assets/images/hero_luxury_candles_decor_1790775140482.jpg',
        description: 'Sensual blend of Damascus Rose, Arabian Oud, and Cashmere musk in a portable brushed gold travel tin. Perfect mood lighting for romantic evenings.',
        scentNotes: ['Damascus Rose', 'Arabian Oud', 'Cashmere Musk'],
        burnTime: '35 Hours',
        dimensions: '7.5cm x 5cm (180g)',
        waxType: 'Soy Wax',
        isBestSeller: false,
        isNewArrival: true,
        inStock: true,
        rating: 4.7,
        reviewsCount: 19,
        whatsappText: 'Hi Tayyaba, I want to order Royal Velvet Rose & Oud Scented Tin'
      },
      {
        id: 'prod-9',
        name: 'Luxury Velvet Gift Hamper Box (Customized)',
        nameUrdu: 'لگژری ویلویٹ گفٹ ہیمپر باکس',
        category: 'gift-sets',
        price: 3850,
        originalPrice: 4500,
        image: '/src/assets/images/category_candle_hamper_lifestyle_1790853114266.jpg',
        description: 'Custom luxury gift box containing 2 scented candles, personalized greeting card, luxury match bottle with striker, and decorative floral dry wreath.',
        scentNotes: ['Customizable Fragrances', 'Velvet Ribbon Box', 'Gold Foil Personalized Card'],
        burnTime: 'Combined 80+ Hours',
        dimensions: '10in x 8in x 4in Gift Box',
        isBestSeller: true,
        isNewArrival: false,
        inStock: true,
        rating: 5.0,
        reviewsCount: 63,
        whatsappText: 'Hi Tayyaba, I want to order Customized Luxury Velvet Gift Hamper'
      }
    ],
    bookings: [],
    orders: [],
    mediaList: [
      {
        id: 'media-1',
        title: 'Aesthetic Scented Candles 🕯️',
        type: 'video',
        src: 'https://assets.mixkit.co/videos/preview/mixkit-decorating-a-birthday-party-table-41712-large.mp4',
        poster: '/src/assets/images/story_candle_pouring_craft_1790853101150.jpg',
        category: 'Handmade Candles',
        likes: 165,
        createdAt: '2026-03-28'
      },
      {
        id: 'media-2',
        title: 'Premium Party Decorations 🎉',
        type: 'video',
        src: 'https://assets.mixkit.co/videos/preview/mixkit-decorating-a-birthday-party-table-41712-large.mp4',
        poster: '/src/assets/images/product_party_decor_setup_1790775176807.jpg',
        category: 'Party Decor',
        likes: 240,
        createdAt: '2026-03-25'
      },
      {
        id: 'media-3',
        title: 'Minimalist Bubble Candle Aesthetic Unboxing 📦',
        type: 'image',
        src: '/src/assets/images/product_luxury_bubble_candle_1790775202396.jpg',
        category: 'Candles',
        likes: 118,
        createdAt: '2026-03-20'
      }
    ],
    teamMembers: [
      {
        id: 'team-1',
        name: 'Tayyaba',
        designation: 'Founder & Creative Director',
        callNumber: '0324-4787003',
        whatsappNumber: '923244787003',
        avatarType: 'crown',
        bio: 'Founder of Meer Royal Decor & Candle Requires. Pioneering aesthetic handmade candles and premium event decor with bespoke artistry.'
      },
      {
        id: 'team-2',
        name: 'Aqsa',
        designation: 'Managing Director & Operations',
        callNumber: '0303-9374747',
        whatsappNumber: '923039374747',
        avatarType: 'crown',
        bio: 'Overseeing order dispatch, customer relations, and nationwide logistics.'
      },
      {
        id: 'team-3',
        name: 'Abu Sufyan',
        designation: 'Web Developer',
        callNumber: '0329-0725117',
        whatsappNumber: '923490726485',
        avatarType: 'tech',
        bio: 'Web engineer behind high-speed, secure online booking and digital e-commerce systems.'
      }
    ],
    timings: {
      openingTime: '10:00 AM',
      closingTime: '11:00 PM',
      sameDayCutoff: '2:00 PM',
      deliveryDays: 'Monday - Sunday (7 Days a Week)',
      timeSlots: [
        'Morning Slot (11:00 AM - 03:00 PM)',
        'Evening Slot (04:00 PM - 08:00 PM)',
        'Night Gala Slot (08:30 PM - 12:00 AM)',
        'Flexible Time (Call to coordinate)'
      ]
    }
  };
}

// Database helper functions
function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = getInitialDb();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database file:', err);
    return getInitialDb();
  }
}

function writeDb(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing database file:', err);
  }
}

// Middleware
app.use(express.json());

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'persistent-json-db', timestamp: new Date().toISOString() });
});

app.get('/api/database', (req, res) => {
  const db = readDb();
  res.json(db);
});

// Bookings
app.get('/api/bookings', (req, res) => {
  const db = readDb();
  res.json(db.bookings || []);
});

app.post('/api/bookings', (req, res) => {
  const db = readDb();
  const booking = {
    ...req.body,
    id: req.body.id || `bk-${Date.now()}`,
    createdAt: req.body.createdAt || new Date().toISOString(),
    status: req.body.status || 'confirmed'
  };
  db.bookings = [booking, ...(db.bookings || [])];
  writeDb(db);
  res.status(201).json(booking);
});

app.delete('/api/bookings/:id', (req, res) => {
  const db = readDb();
  const id = req.params.id;
  db.bookings = (db.bookings || []).filter((b: any) => b.id !== id);
  writeDb(db);
  res.json({ success: true, id });
});

// Orders
app.get('/api/orders', (req, res) => {
  const db = readDb();
  res.json(db.orders || []);
});

app.post('/api/orders', (req, res) => {
  const db = readDb();
  const order = {
    ...req.body,
    id: req.body.id || `ord-${Date.now()}`,
    orderNumber: req.body.orderNumber || `MRD-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: req.body.createdAt || new Date().toISOString(),
    status: req.body.status || 'pending'
  };
  db.orders = [order, ...(db.orders || [])];
  writeDb(db);
  res.status(201).json(order);
});

app.patch('/api/orders/:id', (req, res) => {
  const db = readDb();
  const id = req.params.id;
  db.orders = (db.orders || []).map((o: any) => o.id === id ? { ...o, ...req.body } : o);
  writeDb(db);
  res.json({ success: true, id });
});

app.delete('/api/orders/:id', (req, res) => {
  const db = readDb();
  const id = req.params.id;
  db.orders = (db.orders || []).filter((o: any) => o.id !== id);
  writeDb(db);
  res.json({ success: true, id });
});

// Products
app.get('/api/products', (req, res) => {
  const db = readDb();
  res.json(db.products || []);
});

app.post('/api/products', (req, res) => {
  const db = readDb();
  const product = {
    ...req.body,
    id: req.body.id || `prod-${Date.now()}`,
    rating: req.body.rating || 5.0,
    reviewsCount: req.body.reviewsCount || 1
  };
  db.products = [product, ...(db.products || [])];
  writeDb(db);
  res.status(201).json(product);
});

app.patch('/api/products/:id', (req, res) => {
  const db = readDb();
  const id = req.params.id;
  db.products = (db.products || []).map((p: any) => p.id === id ? { ...p, ...req.body } : p);
  writeDb(db);
  res.json({ success: true, id });
});

app.delete('/api/products/:id', (req, res) => {
  const db = readDb();
  const id = req.params.id;
  db.products = (db.products || []).filter((p: any) => p.id !== id);
  writeDb(db);
  res.json({ success: true, id });
});

// Timings
app.get('/api/timings', (req, res) => {
  const db = readDb();
  res.json(db.timings);
});

app.post('/api/timings', (req, res) => {
  const db = readDb();
  db.timings = { ...db.timings, ...req.body };
  writeDb(db);
  res.json(db.timings);
});

// Team
app.get('/api/team', (req, res) => {
  const db = readDb();
  res.json(db.teamMembers || []);
});

app.post('/api/team', (req, res) => {
  const db = readDb();
  const member = {
    ...req.body,
    id: req.body.id || `team-${Date.now()}`
  };
  db.teamMembers = [...(db.teamMembers || []), member];
  writeDb(db);
  res.status(201).json(member);
});

app.delete('/api/team/:id', (req, res) => {
  const db = readDb();
  const id = req.params.id;
  db.teamMembers = (db.teamMembers || []).filter((t: any) => t.id !== id);
  writeDb(db);
  res.json({ success: true, id });
});

// Media
app.get('/api/media', (req, res) => {
  const db = readDb();
  res.json(db.mediaList || []);
});

app.post('/api/media', (req, res) => {
  const db = readDb();
  const media = {
    ...req.body,
    id: req.body.id || `med-${Date.now()}`,
    createdAt: req.body.createdAt || new Date().toISOString().split('T')[0],
    likes: 1
  };
  db.mediaList = [media, ...(db.mediaList || [])];
  writeDb(db);
  res.status(201).json(media);
});

app.delete('/api/media/:id', (req, res) => {
  const db = readDb();
  const id = req.params.id;
  db.mediaList = (db.mediaList || []).filter((m: any) => m.id !== id);
  writeDb(db);
  res.json({ success: true, id });
});

// Mount Vite in Dev / Serve static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true }
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`🚀 Full-stack Database Server running on http://localhost:${PORT}`);
  });
}

startServer();
