import type { ProductItems } from "../types/types";

export const Product: ProductItems[] = [
  {
    productID: "H001",
    productName: "Fenghuang Down",
    productDescription:
      "An ancient divine key that have the ability to either manipulate one mind or create sentience awareness.",
    productImage: "https://placehold.co/200x200",
    productInStock: true,

    productQuantity: 1,
    productPrice: 300,
    productTangible: true,
    productCategory: ["Jewelry", "Home Goods", "Antique"],
    productMerchant: "Senti9000Merch",
    productBrand: "Key of Sentience",
  },
  {
    productID: "H002",
    productName: "Judgment of Shamash",
    productDescription:
      "Do not ask how do I obtained this. Just umm be careful when holding it, it may give you a high degree burns.",
    productImage: "https://placehold.co/200x200",
    productInStock: true,

    productQuantity: 3,
    productPrice: 200,
    productTangible: true,
    productCategory: ["Gaming", "Antique"],
    productMerchant: "Senti9000Merch",
    productBrand: "Key of Sentience",
  },
  {
    productID: "H003",
    productName: "JingweiToken!",
    productDescription:
      "JINGWEI TO THE PEAK OF TAXIAUN! ALL HAIL HERRSCHER OF SENTIENCE!",
    productImage: "https://placehold.co/200x200",
    productInStock: true,

    productQuantity: 2000,
    productPrice: 0.5,
    productTangible: false,
    productCategory: ["Virtual"],
    productMerchant: "Senti9000Merch",
    productBrand: "Key of Sentience",
  },
];

export const Category: string[] = [
  "Electronics",
  "Apparel",
  "Home Goods",
  "Books",
  "Gaming",
  "Jewelry",
  "Antique",
  "Virtual",
];
