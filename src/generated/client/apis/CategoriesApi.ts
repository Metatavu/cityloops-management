/* tslint:disable */
/* eslint-disable */
/**
 * CityLoops API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    Category,
    CategoryFromJSON,
    CategoryToJSON,
} from '../models';

export interface CreateCategoryRequest {
    category: Category;
}

export interface DeleteCategoryRequest {
    categoryId: string;
}

export interface FindCategoryRequest {
    categoryId: string;
}

export interface ListCategoriesRequest {
    parentCategoryId?: string;
}

export interface UpdateCategoryRequest {
    category: Category;
    categoryId: string;
}

/**
 * no description
 */
export class CategoriesApi extends runtime.BaseAPI {

    /**
     * Creates new category
     * Create a category.
     */
    async createCategoryRaw(requestParameters: CreateCategoryRequest): Promise<runtime.ApiResponse<Category>> {
        if (requestParameters.category === null || requestParameters.category === undefined) {
            throw new runtime.RequiredError('category','Required parameter requestParameters.category was null or undefined when calling createCategory.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearerAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/categories`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CategoryToJSON(requestParameters.category),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CategoryFromJSON(jsonValue));
    }

    /**
     * Creates new category
     * Create a category.
     */
    async createCategory(requestParameters: CreateCategoryRequest): Promise<Category> {
        const response = await this.createCategoryRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes category
     * Deletes a category.
     */
    async deleteCategoryRaw(requestParameters: DeleteCategoryRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.categoryId === null || requestParameters.categoryId === undefined) {
            throw new runtime.RequiredError('categoryId','Required parameter requestParameters.categoryId was null or undefined when calling deleteCategory.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearerAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/categories/{categoryId}`.replace(`{${"categoryId"}}`, encodeURIComponent(String(requestParameters.categoryId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes category
     * Deletes a category.
     */
    async deleteCategory(requestParameters: DeleteCategoryRequest): Promise<void> {
        await this.deleteCategoryRaw(requestParameters);
    }

    /**
     * Finds a category by id
     * Find a category.
     */
    async findCategoryRaw(requestParameters: FindCategoryRequest): Promise<runtime.ApiResponse<Category>> {
        if (requestParameters.categoryId === null || requestParameters.categoryId === undefined) {
            throw new runtime.RequiredError('categoryId','Required parameter requestParameters.categoryId was null or undefined when calling findCategory.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearerAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/categories/{categoryId}`.replace(`{${"categoryId"}}`, encodeURIComponent(String(requestParameters.categoryId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CategoryFromJSON(jsonValue));
    }

    /**
     * Finds a category by id
     * Find a category.
     */
    async findCategory(requestParameters: FindCategoryRequest): Promise<Category> {
        const response = await this.findCategoryRaw(requestParameters);
        return await response.value();
    }

    /**
     * Lists categories
     * List categories.
     */
    async listCategoriesRaw(requestParameters: ListCategoriesRequest): Promise<runtime.ApiResponse<Array<Category>>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.parentCategoryId !== undefined) {
            queryParameters['parentCategoryId'] = requestParameters.parentCategoryId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearerAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/categories`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(CategoryFromJSON));
    }

    /**
     * Lists categories
     * List categories.
     */
    async listCategories(requestParameters: ListCategoriesRequest): Promise<Array<Category>> {
        const response = await this.listCategoriesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates category
     * Updates a category.
     */
    async updateCategoryRaw(requestParameters: UpdateCategoryRequest): Promise<runtime.ApiResponse<Category>> {
        if (requestParameters.category === null || requestParameters.category === undefined) {
            throw new runtime.RequiredError('category','Required parameter requestParameters.category was null or undefined when calling updateCategory.');
        }

        if (requestParameters.categoryId === null || requestParameters.categoryId === undefined) {
            throw new runtime.RequiredError('categoryId','Required parameter requestParameters.categoryId was null or undefined when calling updateCategory.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearerAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/categories/{categoryId}`.replace(`{${"categoryId"}}`, encodeURIComponent(String(requestParameters.categoryId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CategoryToJSON(requestParameters.category),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CategoryFromJSON(jsonValue));
    }

    /**
     * Updates category
     * Updates a category.
     */
    async updateCategory(requestParameters: UpdateCategoryRequest): Promise<Category> {
        const response = await this.updateCategoryRaw(requestParameters);
        return await response.value();
    }

}
