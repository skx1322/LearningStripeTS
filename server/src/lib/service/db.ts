import { status } from "elysia";
import { Account } from "../../model/user.model";
import type { AccountRegister } from "../../types/types";
import { EncryptPass, VerifyPass } from "../../utils/bcrypt";
import { uploadImage } from "./s3";
import { UUIDHex } from "../../utils/uuid";

export class DBAccount {
    accountBody: AccountRegister;
    constructor(accountBody: AccountRegister) {
        this.accountBody = accountBody;
    }

    async CreateAccount() {
        try {
            const emailCheck = await Account.findOne({ email: this.accountBody.email });
            if (emailCheck) {
                throw status(403, {
                    success: false,
                    message: "Email has been taken."
                })
            };

            const newPassword = await EncryptPass(this.accountBody.password);
            if (!newPassword) {
                throw status(502, {
                    success: false,
                    message: "Account failed to generate due to password-service error."
                })
            };

            const uploadedImage = await uploadImage(<File>this.accountBody.avatar);
            if (!uploadedImage) {
                throw status(502, {
                    success: false,
                    error: true,
                    message: "Failed to upload image to service."
                })
            }

            const accountPayload = {
                _id: await UUIDHex(),
                username: this.accountBody.username,
                email: this.accountBody.email,
                password: newPassword,
                avatar: uploadedImage,
            }

            const newAccount = new Account(accountPayload);
            const saveAccount = await newAccount.save();
            return saveAccount;
        } catch (error) {
            throw error;
        }
    }

    async LoginAccount() {
        const findUser = await Account.findOne({
            $or: [
                { username: this.accountBody.username }, { email: this.accountBody.username }
            ]
        });
        if (!findUser) {
            throw status(404, {
                success: false,
                message: "User not found."
            });
        };

        if (findUser.status === "Inactive") {
            return status(403, {
                success: false,
                message: "User account are inactive, the document won't be accessible.",
            })
        }

        const verifyPassword = await VerifyPass(this.accountBody.password, findUser.password);
        if (!verifyPassword) {
            throw status(401, {
                success: false,
                message: "Incorrect password."
            });
        };

        const updatedUser = await Account.findByIdAndUpdate(
            findUser._id,
            { lastLogin: new Date() },
            { new: true }
        );
        await updatedUser?.save();
        const userID = findUser._id;
        return userID;
    }
}