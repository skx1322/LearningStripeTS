import Stripe from "stripe";
import { STRIPE_CONFIG } from "./env.global";

export const stripe = new Stripe(<string>STRIPE_CONFIG.STRIPE_SECKEY);