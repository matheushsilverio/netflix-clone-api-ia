import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const SECRET_HASH_KEY = process.env.SECRET_HASH_KEY;
const ALGORITHM = "aes-256-cbc";

export default class Crypto {
  static encrypt(value: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      ALGORITHM,
      Buffer.from(SECRET_HASH_KEY),
      iv
    );
    const encrypted = cipher.update(value);
    const valueEncrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString("hex")}:${valueEncrypted.toString("hex")}`;
  }

  static decrypt(value: string): string {
    const [valueIv, valueText] = value.split(":");
    const iv = Buffer.from(valueIv, "hex");

    const encryptedText = Buffer.from(valueText, "hex");
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      Buffer.from(SECRET_HASH_KEY),
      iv
    );
    const descrypted = decipher.update(encryptedText);

    const valueDescrypted = Buffer.concat([descrypted, decipher.final()]);
    return valueDescrypted.toString();
  }
}
