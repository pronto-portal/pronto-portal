import { TotalRowCount } from './base';
import { Translator, User } from '../ObjectTypes';

export interface AddAndCreateTranslatorResponse {
    addAndCreateTranslator: User;
}

export interface GetTranslators extends TotalRowCount {
    translators: User[];
}

export interface GetTranslatorsResponse {
    getTranslators: GetTranslators;
}

export interface GetTranslatorResponse {
    getTranslator: User;
}

export interface GetNonUserTranslators extends TotalRowCount {
    translators: Translator[];
}

export interface GetNonUserTranslatorsResponse {
    getNonUserTranslators: GetNonUserTranslators;
}

export interface GetNonUserTranslatorResponse {
    getNonUserTranslator: Translator;
}

export interface UpdateNonUserTranslatorResponse {
    updateNonUserTranslator: Translator;
}

export interface DeleteNonUserTranslatorResponse {
    deleteNonUserTranslator: Translator;
}

export interface AddNonUserTranslatorResponse {
    addNonUserTranslator: Translator;
}
