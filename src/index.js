require('dotenv').config();
const app = require('./config/app');
const connectDB = require('./config/database');

// إعداد المنفذ
const PORT = process.env.PORT || 3000;

// اتصال بقاعدة البيانات 
// تعليق الاتصال بقاعدة البيانات مؤقتًا للعرض التوضيحي فقط
// في بيئة حقيقية، يجب إلغاء التعليق عن هذا السطر
// connectDB();

// بدء تشغيل الخادم
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`View the application at https://${process.env.PROJECT_DOMAIN}.glitch.me`);
});