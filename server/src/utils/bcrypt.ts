import { SERVER_CONFIG } from "../config/env.global";

const currentKey = SERVER_CONFIG.CIPHER;
if (!currentKey) {
    console.error("Invalid KEY");
}

export async function EncryptPass(password: string): Promise<string> {
    const hashPass = await Bun.password.hash(password, {
        algorithm: "bcrypt",
        cost: 12,
    })
    return hashPass;
}

export async function VerifyPass(password: string, hash: string): Promise<boolean> {
    const isMatch = await Bun.password.verify(password, hash);
    return isMatch;
}