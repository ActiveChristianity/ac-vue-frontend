/* THIS IS ONLY FOR NODE TESTING */
//let cookie: string;
/* END */

function strArr(sa: any, delimiter: string = ', '): string {
  if (!sa) return ''
  if (typeof sa === 'object') {
    return Object.keys(sa).map((k: string) => `${k}: ${strArr(sa[k])}`).join(delimiter)
  }
  return Array.isArray(sa) ? sa.join(delimiter) : sa
}

function errorMessage(gqlError: IgqlError): string {
  let msg = strArr(gqlError.message)
  if (gqlError.extensions) {
    if (gqlError.extensions.validation) {
      msg = strArr(gqlError.extensions.validation)
    }
  }
  return msg
}

const tmpCache: any = {}
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    let character = str.charCodeAt(i);
    hash = ((hash<<5)-hash)+character;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function gqlFetch(url: string, body: any, headers: any, cache: boolean = false, debug: boolean = false) {
  let hash: number;
  if (cache) {
    hash = hashCode(body);
    if (tmpCache[hash] && Date.now() < tmpCache[hash].ts) {
      return Promise.resolve(JSON.parse(tmpCache[hash].result))
    }
  }

  return fetch(url, {
    method: 'POST',
    body,
    credentials: 'include',
    mode: 'cors', // 'cors' by default
    headers
  }).then( (res: any) => {
    /* THIS IS ONLY FOR NODE TESTING */
    //cookie = res.headers.get('set-cookie') as string;
    /* END */
    return res.json()
  }).then((gqlResponse: IgqlResponse) => {
    if (gqlResponse.errors) {
      if (debug) console.error(gqlResponse.errors.map(errorMessage).join(' & '))
      return Promise.reject(gqlResponse.errors.map(errorMessage))
    } else {
      const { data } = gqlResponse
      if (debug) console.info(data)
      if (cache && hash) {
        tmpCache[hash] = {
          ts: Date.now() + 300000,
          result: JSON.stringify(data)
        }
      }
      return Promise.resolve(data)
    }
  })
}

export default (config: IConfig):FFetch => {
  return async (query: string, variables: any = {}, cache: boolean = false, include_csrf: boolean = false):Promise<any> => {
    //return (window as any).gqlFetch(query, variables);

    const body = JSON.stringify({
      variables,
      query: query.trim(),
    })

    const headers: any = {
      'Content-Type': 'application/json',
      /* THIS IS ONLY FOR NODE TESTING */
      //cookie
      /* END */
      ...config.headers
    }

    if (include_csrf) {
      const { csrf } = await gqlFetch(config.gql_api_url, `{"query":"{ csrf }"}`, headers)
      headers['X-CSRF-TOKEN'] = csrf
    }

    return gqlFetch(config.gql_api_url, body, headers, cache, config.debug)
  }
}
