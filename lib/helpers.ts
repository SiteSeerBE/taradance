import axios from "axios";
import { prisma } from "@/lib/prisma";
import { RoleType } from "@prisma/client";

/**
 * Create slug from a string.
 * @param {string} title - The text to be converted.
 *
 *  * @example
 * ```typescript
 * const collectionPath: string = "blogposts";
 * const title: string = "Mijn eerste blogpost";
 * const slug = getSlug(collectionPath,title);
 * console.log('slug', slug);
 * ```
 */
const getSlug = async (table: string, title: string) => {
  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");
  let newSlug = slug;
  let counter = 1;
  while (await isExistingSlug(table, newSlug)) {
    newSlug = `${slug}-${counter}`;
    counter++;
  }
  return newSlug;
};

/**
 * Checks whether a string is a valid slug and does not already exist in the database.
 * @param {string} slug - The string to check.
 *
 *  * @example
 * ```typescript
 * const table: string = "blogposts";
 * const slug: string = "mijn-eerste-blogpost";
 * const slugIsValid = isValidSlug(collectionPath,slug);
 * console.log('slugIsValid', slugIsValid);
 * ```
 */
const isExistingSlug = async (table: string, slug: string) => {
  try {
    const response = await axios.get("/api/author/slug", {
      params: {
        table,
        slug,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Returns boolean whether email is a valid email address.
 * @param {string} email - The value to check.
 *
 *  * @example
 * ```typescript
 * const email = "demo@somedomain.com";
 * const isValidEmail = checkIsValidEmail(email);
 * console.log('E-mail is valid', isValidEmail);
 * ```
 */
const checkIsValidEmail = (email: string) => {
  const emailRegex = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  return emailRegex.test(email);
};

/**
 * Returns date in string format for use in a form.
 * @param {string} date - The value to convert.
 *
 *  * @example
 * ```typescript
 * const dbDate = "Wed May 15 2024 00:00:00 GMT+0200 (Central European Summer Time)";
 * const formDate = dateFormFormat(dbDate); // 15-05-2024
 * console.log('Date for form', formDate);
 * ```
 */
const dateFormFormat = (date: Date) => {
  const dateObject = new Date(date);
  return dateObject.toISOString().split("T")[0];
};

/**
 * Returns boolean whether url is an imageKit url.
 * @param {string} url - The value to check.
 *
 *  * @example
 * ```typescript
 * const url = "https://ik.imagekit.io/taradance/home/les.jpg?updatedAt=1726125547932";
 * const isImageKitUrl = checkIsImageKitUrl(url);
 * console.log('url is imagekit', isImageKitUrl);
 * ```
 */
const isImageKitUrl = (url: string) => {
  const ImageKitEndPoinht = "https://ik.imagekit.io/taradance/";
  return url.startsWith(ImageKitEndPoinht);
};

export { checkIsValidEmail, dateFormFormat, getSlug, isImageKitUrl };
