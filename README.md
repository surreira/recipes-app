# Recipes App

> Yet another recipes web app.

This project works as an experiment to try recent web development technologies, the result is a simple web app to display recipes.

To develop this experiment, I've used Typescript with the [Next.js](https://nextjs.org) framework and [Sanity](https://www.sanity.io) for data storage. To style the project, the utility-first CSS framework [Tailwind CSS](https://tailwindcss.com).

The app is available at [https://receitas-tm.vercel.app](https://receitas-tm.vercel.app).

## Installing / Getting started

To setup the project, open the command line terminal and execute the following commands:

```bash
git clone git@github.com:surreira/recipes-app.git
cd recipes-app
yarn install
```

These commands allows you to download the source code to your computer and install all of the required dependencies.

### Initial configuration

To finish this project installation, add a `.env.local` to the project root and provide the required variables values. The env variables required are:

```.env
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_PROJECT_ID
SANITY_WEBHOOK_SECRET
```

## Developing

```
yarn dev
```

## Building

```bash
yarn build
```

## Deploying / Publishing

I'm using [Vercel](https://vercel.com) to publish this project and the deploy is as simple as pushing the main git branch to GitHub and Vercel will do the rest.

## Features
