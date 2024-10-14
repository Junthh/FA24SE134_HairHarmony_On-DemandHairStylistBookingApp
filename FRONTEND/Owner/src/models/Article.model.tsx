export interface ArticleModelList {
    id: string;
    title: string;
    categoryName: string;
    createdAt: Date;
    createdBy: string;
    isFeature: boolean;
    actions?: any;
};

export interface ArticleModelFilterParams {
    categoryId?: string,
    isFeature?: string | boolean,
    q?: string,
    dateFilter?: any,
    page?: number,
    perPage?: number,
};

export interface ArticleForm {
    title: string,
    projectId: string,
    writerId: string,
    categoryId: string,
    detail?: string,
    image?: any,
    isFeature?: boolean,
    tags?: Array<string>
}
