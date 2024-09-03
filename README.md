# bun-tada-gql-playground

This repository is a result of my search for GraphiQL/Postman replacement. Those projects are really cool and handy, but I have a few scenarios I wanted to cover:

- chain queries: create new user, generate token and complete checkout with it. It can be done with Postman, but I find UI cumbersome to quickly edit
- personal catalog of handy scripts: sometimes I need to make some data manipulation before proceeding with the next query. Can be done with other tools, but I find having single TS file editing more ergonomic
- sharing code examples: sometimes small piece of code is worth thousand of words

## Why Bun?

- fast startup / test / watcher: I don't want to wait on the tool just to run some queries
- batteries included: It took zero setup to enjoy TS, top level async, run scripts with single command with watcher, use .env files
- changing runtime to another should be fairly easy

## Why gql.tada?

- no more running codegen watchers / commands to convert GQL to TS types
- code completion works great and its fast

# Initial setup

To install dependencies:

```bash
bun install
```

Project require API URL, which an be provided with .env file. Providing App token is optional, and only required for appGqlClient.

## VSCode integration

To work properly, VSCode has to use TS from workspace installation (gql.tada requirement). The repository is already configured, you'll only need to accept prompt upon the first opening this project.

More information: https://gql-tada.0no.co/get-started/installation#vscode-setup 

You'll also be prompted with installation of the Bun extension, which will be important for running debugger (see section below).

# How to work with this repo?

## Run the script
Script is completed? Just need to launch it? Type:

```bash
bun ./simple.ts
```

## Watcher mode

Handy when you are modifying the script and want to run it on every file change: 

```bash
bun --watch ./simple.ts
```

## With debugger

Something is acting weird? Want to have insight into contents of every variable in the scope? [Use VSCode debugger](https://bun.sh/guides/runtime/vscode-debugger)!
