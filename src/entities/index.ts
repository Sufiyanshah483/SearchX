/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: tweetcategories
 * Interface for TweetCategories
 */
export interface TweetCategories {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  categoryName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  categoryIcon?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType boolean */
  isActive?: boolean;
}


/**
 * Collection ID: userprofiles
 * Interface for UserProfiles
 */
export interface UserProfiles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  displayName?: string;
  /** @wixFieldType text */
  userHandle?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  profileAvatar?: string;
  /** @wixFieldType date */
  joinDate?: Date | string;
  /** @wixFieldType text */
  location?: string;
}


/**
 * Collection ID: viraltweets
 * Interface for ViralTweets
 */
export interface ViralTweets {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  tweetContent?: string;
  /** @wixFieldType url */
  mediaUrl?: string;
  /** @wixFieldType text */
  authorName?: string;
  /** @wixFieldType text */
  authorHandle?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  authorAvatar?: string;
  /** @wixFieldType number */
  likesCount?: number;
  /** @wixFieldType number */
  retweetsCount?: number;
  /** @wixFieldType number */
  viewsCount?: number;
  /** @wixFieldType datetime */
  publicationDate?: Date | string;
}
