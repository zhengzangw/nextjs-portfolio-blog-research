export interface GalleryItem {
  readonly type: "image" | "video";
  readonly src: string;
  readonly alt: string;
}

export interface ProjectLink {
  readonly type: string;
  readonly href: string;
  readonly icon: string;
}

export interface ProjectItem {
  readonly title: string;
  readonly slug: string;
  readonly href?: string;
  readonly dates: string;
  readonly active: boolean;
  readonly description: string;
  readonly longDescription: string;
  readonly categories: readonly string[];
  readonly technologies?: readonly string[];
  readonly authors?: string;
  readonly links?: readonly ProjectLink[];
  readonly image?: string;
  readonly video?: string;
  readonly gallery?: readonly GalleryItem[];
}
