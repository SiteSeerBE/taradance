import { getCollectionItem } from "./CRUD/getCollectionItem";

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
const getSlug = async (collectionPath: string, title: string) => {
  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");
  let newSlug = slug;
  let counter = 1;
  while (await isExistingSlug(collectionPath, newSlug)) {
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
 * const collectionPath: string = "blogposts";
 * const slug: string = "mijn-eerste-blogpost";
 * const slugIsValid = isValidSlug(collectionPath,slug);
 * console.log('slugIsValid', slugIsValid);
 * ```
 */
const isExistingSlug = async (collectionPath: string, slug: string) => {
  const response = await getCollectionItem(collectionPath, slug);
  if (response) {
    return true;
  }
  return false;
};

export { getPathname, getSlug };
