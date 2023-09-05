/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResultLong } from '@/api'
import type { ResultString } from '@/api'
import type { ResultUserVO } from '@/api'
import type { UserLoginDTO } from '@/api'
import type { UserRegisterDTO } from '@/api'

import type { CancelablePromise } from '@/api'
import { OpenAPI } from '@/api'
import { request as __request } from '../core/request'

export class UserService {
  /**
   * 用户注册
   * @param requestBody
   * @returns ResultLong OK
   * @throws ApiError
   */
  public static userRegister(
    requestBody: UserRegisterDTO
  ): CancelablePromise<ResultLong> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/user/register',
      body: requestBody,
      mediaType: 'application/json'
    })
  }

  /**
   * 用户登入
   * @param requestBody
   * @returns ResultString OK
   * @throws ApiError
   */
  public static userLogin(
    requestBody: UserLoginDTO
  ): CancelablePromise<ResultString> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/user/login',
      body: requestBody,
      mediaType: 'application/json'
    })
  }

  /**
   * 获取登录用户信息
   * @returns ResultUserVO OK
   * @throws ApiError
   */
  public static getLoginUser(): CancelablePromise<ResultUserVO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user/getLoginUser'
    })
  }
}
