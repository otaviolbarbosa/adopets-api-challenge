import bcrypt from 'bcryptjs';

export const encryptPassword = async password => {
  return await bcrypt.hash(password, 4);
};

export const checkPassword = async (stored, provided) => {
  return bcrypt.compare(provided, stored);
};
