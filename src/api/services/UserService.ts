/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResultLong } from '../models/ResultLong';
import type { ResultString } from '../models/ResultString';
import type { ResultUserVO } from '../models/ResultUserVO';
import type { UserLoginDTO } from '../models/UserLoginDTO';
import type { UserRegisterDTO } from '../models/UserRegisterDTO';
import type { UserUpdateDTO } from '../models/UserUpdateDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * 修改用户个人信息
     * @param requestBody 
     * @returns ResultLong OK
     * @throws ApiError
     */
    public static updateUserInfo(
requestBody: UserUpdateDTO,
): CancelablePromise<ResultLong> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/updateInfo',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 修改头像
     * @param requestBody 
     * @returns ResultString OK
     * @throws ApiError
     */
    public static updateUserAvatar(
requestBody: {
file?: Blob;
},
): CancelablePromise<ResultString> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/updateAvatar',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 用户注册
     * @param requestBody 
     * @returns ResultLong OK
     * @throws ApiError
     */
    public static userRegister(
requestBody: UserRegisterDTO,
): CancelablePromise<ResultLong> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 用户登入
     * @param requestBody 
     * @returns ResultString OK
     * @throws ApiError
     */
    public static userLogin(
requestBody: UserLoginDTO,
): CancelablePromise<ResultString> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 获取登录用户信息
     * @returns ResultUserVO OK
     * @throws ApiError
     */
    public static getLoginUser(): CancelablePromise<ResultUserVO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/getLoginUser',
        });
    }

}
