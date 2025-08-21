import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

const app = express();


app.set('view engine', 'ejs');

 
cloudinary.config({
  cloud_name: 'dcvxudtln',
  api_key: '686578999543284',
  api_secret: 'qlbHJDj34ZK7dSI4uZd5T1EetnQ',
});

 
mongoose.connect('mongodb://localhost:27017/', {
  dbName: 'Nodejs_Master_Course',
})
  .then(() => console.log('MongoDB Connected..!'))
  .catch(err => console.error('MongoDB connection error:', err));

 
app.get('/', (req, res) => {
  res.render('index', { url: null });
});

 
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage });

 
 
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
     
    const result = await cloudinary.uploader.upload(req.file.path);

    
    res.render('index', { url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).send('Upload failed');
  }
});

const port = 9000;
app.listen(port, () => {
  console.log("This for the testing");
  console.log(`Server is running on http://localhost:${port}`);
});
