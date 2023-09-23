/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeInfo } from './JudgeInfo';
import type { QuestionVO } from './QuestionVO';

export type QuestionSubmitVO = {
    id?: number;
    questionId?: number;
    language?: string;
    code?: string;
    judgeInfo?: JudgeInfo;
    status?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    questionVO?: QuestionVO;
};
