export type TCategory = {
   id: string;
   catName: string;
};

export type TPost = {
   id: string;
   title: string;
   content: string;
   imageUrl: string;
   publicId: string;
   catName?: string;
   authorEmail?: string;
   links: null | string[];
   createdAt: string;
   updatedAt: string;
   author: {
      name: string;
   };
};
