/* THIS IS ONLY FOR NODE TESTING */
//let cookie: string;
/* END */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function strArr(sa, delimiter = ', ') {
    if (!sa)
        return '';
    if (typeof sa === 'object') {
        return Object.keys(sa).map((k) => `${k}: ${strArr(sa[k])}`).join(delimiter);
    }
    return Array.isArray(sa) ? sa.join(delimiter) : sa;
}
function errorMessage(gqlError) {
    let msg = strArr(gqlError.message);
    if (gqlError.extensions) {
        if (gqlError.extensions.validation) {
            msg = strArr(gqlError.extensions.validation);
        }
    }
    return msg;
}
const tmpCache = {};
function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        let character = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
function gqlFetch(url, body, headers, cache = false, debug = false) {
    let hash;
    if (cache) {
        hash = hashCode(body);
        if (tmpCache[hash] && Date.now() < tmpCache[hash].ts) {
            return Promise.resolve(JSON.parse(tmpCache[hash].result));
        }
    }
    return fetch(url, {
        method: 'POST',
        body,
        credentials: 'include',
        mode: 'cors',
        headers
    }).then((res) => {
        /* THIS IS ONLY FOR NODE TESTING */
        //cookie = res.headers.get('set-cookie') as string;
        /* END */
        return res.json();
    }).then((gqlResponse) => {
        if (gqlResponse.errors) {
            if (debug)
                console.error(gqlResponse.errors.map(errorMessage).join(' & '));
            return Promise.reject(gqlResponse.errors.map(errorMessage));
        }
        else {
            const { data } = gqlResponse;
            if (debug)
                console.info(data);
            if (cache && hash) {
                tmpCache[hash] = {
                    ts: Date.now() + 300000,
                    result: JSON.stringify(data)
                };
            }
            return Promise.resolve(data);
        }
    });
}
export default (config) => {
    return (query, variables = {}, cache = false, include_csrf = false) => __awaiter(this, void 0, void 0, function* () {
        //return (window as any).gqlFetch(query, variables);
        const body = JSON.stringify({
            variables,
            query: query.trim(),
        });
        const headers = Object.assign({ 'Content-Type': 'application/json' }, config.headers);
        if (include_csrf) {
            const { csrf } = yield gqlFetch(config.gql_api_url, `{"query":"{ csrf }"}`, headers);
            headers['X-CSRF-TOKEN'] = csrf;
        }
        return gqlFetch(config.gql_api_url, body, headers, cache, config.debug);
    });
};
