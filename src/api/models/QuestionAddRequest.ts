/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeCase } from './JudgeCase';
import type { JudgeConfig } from './JudgeConfig';

export type QuestionAddRequest = {
    title?: string;
    content?: string;
    tags?: Array<string>;
    answer?: string;
    judgeConfig?: JudgeConfig;
    judgeCase?: Array<JudgeCase>;
};
