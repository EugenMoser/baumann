export type FormPasswordStates = {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  actionSuccess?: boolean;
  message: string;
};

export type ProductFormFieldErrors = {
  category?: string[];
  productPrio?: string[];
  productName?: string[];
  descriptionProduct1?: string[];
  descriptionProduct2?: string[];
  descriptionProduct3?: string[];
  descriptionProduct4?: string[];
  material?: string[];
  imageSmall?: string[];
};

export type ArticleFormFieldErrors = {
  articlePrio?: string[];
  articleNumber?: string[];
  articleName?: string[];
  descriptionArticle1?: string[];
  descriptionArticle2?: string[];
  descriptionArticle3?: string[];
  descriptionArticle4?: string[];
  vpe1?: string[];
  vpe2?: string[];
  vpe3?: string[];
  vpe4?: string[];
};

export type NotificationFormStates = {
  globalError?: string; // global error message
  message?: string; // success or info message
  success?: boolean;
};

export type ProductNotificationFormStates = NotificationFormStates & {
  errors?: ProductFormFieldErrors; // field specific errors
};
export type ArticleNotificationFormStates = NotificationFormStates & {
  errors?: ArticleFormFieldErrors; // field specific errors
};

export type ImageUploadState = ProductNotificationFormStates & {
  url?: string; // URL of the uploaded image
};
