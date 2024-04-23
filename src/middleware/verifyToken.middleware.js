import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const verifyToken = async (request, response, next) => {
  const token = request.get('Authorization').split(' ')[1];

  if (!token) return response.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`);

    if (!decoded)
      return response
        .status(401)
        .json({ message: 'Unauthorized - Token tidak valid' });

    request.user = decoded;
    next();
  } catch (error) {
    console.error('Internal server error:', error);
    return response.status(500).json({ message: error });
  }
};
