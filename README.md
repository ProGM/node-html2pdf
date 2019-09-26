# Node HTML2PDF

A simple node server to create pdf files from an URL, using puppeteer.

Written in Typescript, it works as standalone or with AWS Lambda.

### Running standalone implementation

```bash
yarn install
yarn start
```

### Running Lambda implementation

```bash
yarn global add serverless
yarn install
yarn lambda
```

### Deploy on lambda

```bash
serverless deploy -v // Optionally you can specify a profile with `--aws-profile profile-name`
```

### Sentry

Just set the env SENTRY_DSN with your sentry url, and it's done!
