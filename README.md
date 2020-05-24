# msw-tester

Tests [msw](https://github.com/mswjs/msw) with fetch, axios and other libs.

### Run with http

```
npm i
npm start
npm test
```

### Run with https

The article below in step 1 shows how to generate your SSL certificate but I do not recommend creating the certificate for `localhost`.

Instead first add an alias to your hosts file like `localdev` or some other name
of your choice.

0. `sudo nano /etc/hosts`

```
   127.0.0.1    localdev
```

This ensures that you can still use http on `localhost` with all your other projects.

1. Generate the SSL certificate for the alias name that you created with the instructions in this article by replacing `localhost` with the name of your alias:
   [How to get HTTPS working on your local development environment in 5 minutes](https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/)
2. Generate dev.key and dev.crt follow instructions in the article but replace `localhost` with the name of you alias name.
3. Place the generated `server.crt` and `server.key` on the project root and rename them to `dev.crt` and `dev.key`.
4. Run: `npm run start-https`
5. Open the browser to https://localdev:3000/ or other alias name you created.
