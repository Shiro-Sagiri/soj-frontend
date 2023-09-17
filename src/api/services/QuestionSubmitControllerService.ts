/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionSubmitAddRequest } from '../models/QuestionSubmitAddRequest';
import type { QuestionSubmitQueryRequest } from '../models/QuestionSubmitQueryRequest';
import type { ResultLong } from '../models/ResultLong';
import type { ResultPageQuestionSubmitVO } from '../models/ResultPageQuestionSubmitVO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuestionSubmitControllerService {

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
            url: '/question_submit',
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
            url: '/question_submit/page',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
