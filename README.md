# bun-tada-gql-playground

To install dependencies:

```bash
bun install
```

Project require API URL, which an be provided with .env file. Providing App token is optional, and only required for appGqlClient.

To run (I recommend watch mode. It's optional, but handy during exploring the API):

```bash
bun --watch ./simple.ts
```

This project was created using `bun init` in bun v1.1.24. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## VSCode integration

To work properly, VSCode has to use TS from workspace installation. The repository is already configured, you'll only need to accept prompt upon the first opening this project.

More information: https://gql-tada.0no.co/get-started/installation#vscode-setup 
