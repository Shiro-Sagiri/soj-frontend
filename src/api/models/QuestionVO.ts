/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeConfig } from './JudgeConfig';
import type { UserVO } from './UserVO';

export type QuestionVO = {
    id?: number;
    title?: string;
    content?: string;
    tags?: Array<string>;
    submitNum?: number;
    acceptedNum?: number;
    judgeConfig?: JudgeConfig;
    userId?: number;
    userVO?: UserVO;
    createTime?: string;
    updateTime?: string;
};
