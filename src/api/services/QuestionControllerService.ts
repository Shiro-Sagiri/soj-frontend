/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeleteRequest } from '../models/DeleteRequest';
import type { QuestionAddRequest } from '../models/QuestionAddRequest';
import type { QuestionEditRequest } from '../models/QuestionEditRequest';
import type { QuestionQueryRequest } from '../models/QuestionQueryRequest';
import type { QuestionSubmitAddRequest } from '../models/QuestionSubmitAddRequest';
import type { QuestionSubmitQueryRequest } from '../models/QuestionSubmitQueryRequest';
import type { QuestionUpdateRequest } from '../models/QuestionUpdateRequest';
import type { ResultBoolean } from '../models/ResultBoolean';
import type { ResultLong } from '../models/ResultLong';
import type { ResultPageQuestion } from '../models/ResultPageQuestion';
import type { ResultPageQuestionSubmitVO } from '../models/ResultPageQuestionSubmitVO';
import type { ResultPageQuestionVO } from '../models/ResultPageQuestionVO';
import type { ResultQuestion } from '../models/ResultQuestion';
import type { ResultQuestionVO } from '../models/ResultQuestionVO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuestionControllerService {

    /**
     * 更新问题
     * 更新问题
     * @param requestBody 
     * @returns ResultBoolean OK
     * @throws ApiError
     */
    public static updateQuestion(
requestBody: QuestionUpdateRequest,
): CancelablePromise<ResultBoolean> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/question/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 根据id获取问题(脱敏)
     * 根据id获取问题
     * @param id 
     * @returns ResultQuestionVO OK
     * @throws ApiError
     */
    public static getQuestionVoById(
id: number,
): CancelablePromise<ResultQuestionVO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/question/getQuestionVO',
            query: {
                'id': id,
            },
        });
    }

    /**
     * 创建问题
     * 创建问题
     * @param requestBody 
     * @returns ResultLong OK
     * @throws ApiError
     */
    public static addQuestion(
requestBody: QuestionAddRequest,
): CancelablePromise<ResultLong> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/add',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 提交题目
     * 提交题目
     * @param requestBody 
     * @returns ResultLong OK
     * @throws ApiError
     */
    public static questionSubmit(
requestBody: QuestionSubmitAddRequest,
): CancelablePromise<ResultLong> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/questionSubmit/submit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 分页获取提交记录
     * 分页获取提交记录
     * @param requestBody 
     * @returns ResultPageQuestionSubmitVO OK
     * @throws ApiError
     */
    public static getQuestionSubmitPage(
requestBody: QuestionSubmitQueryRequest,
): CancelablePromise<ResultPageQuestionSubmitVO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/questionSubmit/pageList',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 分页获取当前用户创建的问题列表
     * 分页获取当前用户创建的问题列表
     * @param requestBody 
     * @returns ResultPageQuestionVO OK
     * @throws ApiError
     */
    public static listMyQuestionVoByPage(
requestBody: QuestionQueryRequest,
): CancelablePromise<ResultPageQuestionVO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/my/list',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 分页获取问题列表
     * 分页获取问题列表
     * @param requestBody 
     * @returns ResultPageQuestionVO OK
     * @throws ApiError
     */
    public static listQuestionVoByPage(
requestBody: QuestionQueryRequest,
): CancelablePromise<ResultPageQuestionVO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/list',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 分页获取问题列表(不脱敏)
     * 分页获取问题列表(不脱敏)
     * @param requestBody 
     * @returns ResultPageQuestion OK
     * @throws ApiError
     */
    public static getQuestionPage(
requestBody: QuestionQueryRequest,
): CancelablePromise<ResultPageQuestion> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/getQuestionPage',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 编辑问题
     * 编辑问题
     * @param requestBody 
     * @returns ResultBoolean OK
     * @throws ApiError
     */
    public static editQuestion(
requestBody: QuestionEditRequest,
): CancelablePromise<ResultBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/edit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 根据id获取问题
     * 根据id获取问题
     * @param id 
     * @returns ResultQuestion OK
     * @throws ApiError
     */
    public static getQuestionById(
id: number,
): CancelablePromise<ResultQuestion> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/question/getQuestion',
            query: {
                'id': id,
            },
        });
    }

    /**
     * 删除问题
     * 删除问题
     * @param requestBody 
     * @returns ResultBoolean OK
     * @throws ApiError
     */
    public static deleteQuestion(
requestBody: DeleteRequest,
): CancelablePromise<ResultBoolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/question/delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
