import axios from "axios";
import { prisma } from "@/lib/prisma";
import { RoleType } from "@prisma/client";
import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "./logto";

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
 * Returns boolean whether user has a specific role.
 * @param {string} logtoId - The logtoId of the user.
 * @param {RoleType[]} role - The role(s) to check.
 *
 *  * @example
 * ```typescript
 * const logtoId = "1234567890";
 * const role = ["ADMIN", "WRITER"];
 * const hasRole = userHasRole(logtoId, role);
 * console.log('User has role', hasRole);
 * ```
 */
const userHasRole = async (logtoId: string, role: RoleType[]) => {
  const record = await prisma.user.findUnique({
    select: {
      role: true,
    },
    where: { logtoId: logtoId },
  });
  if (record?.role && role.includes(record.role)) {
    return true;
  }
  return false;
};

export default userHasRole;

/**
 * Returns id for the logged on user if their role matches.
 * @param {RoleType[]} role - The role(s) to check.
 *
 *  * @example
 * ```typescript
 * const role = ["ADMIN", "WRITER"];
 * const userId = getUserIdInRole(role);
 * console.log('User has access with id', userId);
 * ```
 */
const getUserIdInRole = async (role: RoleType) => {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
  if (!isAuthenticated || !claims) {
    return null;
  }
  const logtoId = claims?.sub;
  const user = await prisma.user.findUnique({
    where: {
      role,
      logtoId,
    },
    select: {
      id: true,
    },
  });
  if (user) {
    return user.id;
  }
  return null;
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

export {
  checkIsValidEmail,
  dateFormFormat,
  getSlug,
  getUserIdInRole,
  userHasRole,
  isImageKitUrl,
};
