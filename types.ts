export type TCategory = {
   id: string;
   catName: string;
   slug: string;
};

export type TPost = {
   id: string;
   title: string;
   slug: string;
   content: string;
   imageUrl: string;
   publicId: string;
   catName?: string;
   category?: TCategory;
   authorEmail?: string;
   links: null | string[];
   createdAt: string;
   updatedAt: string;
   author: {
      name: string;
   };
};
