import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const verifyToken = async (req, res, next) => {
  const token = req.get('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`);

    if (!decoded)
      return res
        .status(401)
        .json({ message: 'Unauthorized - Token tidak valid' });

    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Unauthorized - Token tidak valid' });
  }
};
