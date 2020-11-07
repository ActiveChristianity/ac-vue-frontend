var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import gql from './gql';
export default class Other {
    constructor(app) {
        this._fetch = app.$fetch;
    }
    /**
     * Returns a list of bible chapters that are referenced in posts.
     *
     * @returns Promise with the bible state
     */
    bibleState() {
        return __awaiter(this, void 0, void 0, function* () {
            const { bible } = yield this._fetch(gql.queries.bible);
            return bible;
        });
    }
    /**
     * Returns a list of postRefs belonging to a specific bible chapter.
     *
     * @returns Promise with the array or postRef results
     */
    biblePosts(id, ch) {
        return __awaiter(this, void 0, void 0, function* () {
            const { biblePosts } = yield this._fetch(gql.queries.biblePosts, { id, ch });
            return biblePosts;
        });
    }
}
