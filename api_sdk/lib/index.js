import gql from './gql';
import fetch from './fetch';
import Auth from './Auth';
import Blog from './Blog';
import Resource from './Resource';
import Forms from './Forms';
import Other from './Other';
let _sdk;
export default function SDK(options) {
    if (_sdk)
        return _sdk;
    const $config = Object.assign({}, options, { authenticated: false, headers: {} });
    const $app = {
        $config,
        $fetch: fetch($config),
        gql
    };
    const auth = new Auth($app);
    const blog = new Blog($app);
    const resource = new Resource($app);
    const forms = new Forms($app);
    const other = new Other($app);
    auth.on('onUser', (user) => {
        $config.authenticated = !!user;
    });
    const setLocale = (locale) => {
        return $config.headers['x-lang'] = locale;
    };
    _sdk = {
        auth,
        blog,
        fetch: $app.$fetch,
        forms,
        other,
        resource,
        setLocale,
    };
    return _sdk;
}
