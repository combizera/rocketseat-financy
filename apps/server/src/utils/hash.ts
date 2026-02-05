import bcrypt from "bcryptjs";

export const hashPassword = async (plainPassword: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(plainPassword, salt);
}

export const comparePassword = (
  plainPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(plainPassword, hashedPassword);
}