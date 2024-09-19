import axios from "axios";

/**
 * Extract the pathname from an internal url.
 * @param {string} url - The url to extract from.
 * @param {boolean} imageKit - If imageKit is required (optional).
 *
 * @throws Will throw an error if a malformed url was entered.
 * @throws Will throw an error if imageKit is required and another url was entered.
 *
 *  * @example
 * ```typescript
 * const url: string = "https://ik.imagekit.io/taradance/home/les.jpg?updatedAt=1726125547932";
 * const pathName = getPathname(url, true);
 * console.log('pathName', pathName);
 * ```
 */
const getPathname = (url: string, imageKit?: boolean) => {
  const internalUrls = [
    "https://ik.imagekit.io",
    "https://taradanceofficial.com",
    "https://taradance.be",
  ];
  // if url is pathname, return pathname
  if (url.startsWith("/")) {
    return url;
  }

  // if imageKit is required check it
  if (imageKit && !url.includes("https://ik.imagekit.io")) {
    throw new Error("imageKit url required");
  }

  // check whether url is valid
  try {
    const urlObject = new URL(url);

    // if url is external return url
    const isInternal = internalUrls.some((internalUrl) =>
      url.startsWith(internalUrl)
    );
    if (!isInternal) {
      return url;
    }

    // if url is internal return pathname
    const cleanedPath = urlObject.pathname;
    return cleanedPath;
  } catch (error) {
    throw new Error("No valid url detected");
  }
};

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

export { checkIsValidEmail, getPathname, getSlug };
