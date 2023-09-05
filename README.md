# ActiveChristianity Vue frontend
This is the Vue frontend for ActiveChristianity, used for [activechristianity.africa](https://activechristianity.africa/), [christianismeactif.africa](https://christianismeactif.africa/) and [ukristohai.africa](https://ukristohai.africa/).

## Deployment
These sites are deployed by [Netlify](https://netlify.com), with different environment variables in each step to render the different languages.

## Local development
Requires Node 16 or lower.

1. Run `npm install`
2. Copy `.env.example` to `.env` and adjust variables as needed. Set locale to either `en_ke`, `fr_cm` or `sw`.
3. Run `npm start` to start a local development server on [localhost:8080](http://localhost:8080)
