import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password.toString(), saltRounds);
};

export const validateHash = (
  incomingPassword: string,
  storedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(incomingPassword.toString(), storedPassword);
};
