var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import gql from './gql';
export default class Resource {
    constructor(app) {
        this._fetch = app.$fetch;
    }
    /**
      * Update an existing resource
      */
    update(type, id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === 'post') {
                const { post } = yield this._fetch(gql.mutations.updatePost, { input: Object.assign({ id }, input) });
                return post;
            }
            else if (type === 'page') {
                const { page } = yield this._fetch(gql.mutations.updatePage, { input: Object.assign({ id }, input) });
                return page;
            }
        });
    }
    /**
     * Fetch the latest version of the resource from backend (admin only)
     *
     * @returns Object<status, message>
     */
    preview(type, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === 'post') {
                const { previewPost } = yield this._fetch(gql.queries.previewPost, { id });
                return previewPost;
            }
            else if (type === 'page') {
                const { previewPage } = yield this._fetch(gql.queries.previewPage, { id });
                return previewPage;
            }
        });
    }
}
