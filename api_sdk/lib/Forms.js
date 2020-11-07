var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import gql from './gql';
export default class Forms {
    constructor(app) {
        this._fetch = app.$fetch;
    }
    /**
     * Fetch a post by id
     *
     * @returns Object<status, message>
     */
    submit(formId, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            const { submit } = yield this._fetch(gql.mutations.submit, { formId, fields });
            return submit;
        });
    }
}
