import nextConnect from 'next-connect';
import { upload } from '../../data/imagesandvideos';

const apiRoute = nextConnect();
apiRoute.use(upload.single('file'));
apiRoute.post((req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.status(200).json({ filename: req.file.filename, path: `/uploads/${req.file.filename}` });
});
export default apiRoute;
export const config = { api: { bodyParser: false } };
