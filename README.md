# Game of Life
<img src="https://user-images.githubusercontent.com/92526601/175125478-2454ef50-6dd6-4ed5-969b-6df5879471fb.gif" alt='screen recording of this project' />

You can use it right now [clicking here!](https://game-of-life-fe-sak.vercel.app/)

## Table of contents
<!--ts-->
   * [About](#about-this-project)
   * [Motivation](#motivation)
   * [Features](#features)
   * [Technologies](#technologies-used)
   * [Prerequisites](#prerequisites-for-running-this-project-on-your-machine)
   * [Install](#install-the-application-locally)
   * [React](#learn-more-about-react-and-how-to-set-it-up)
   
<!--te-->

## About this project

[(Return to table of contents)](#table-of-contents)

In 1970, mathematician John Conway created a cellular automaton named "Game of Life". It simulates the development of a life form on a 2d space grid. Each square represents a life, or as called by Conway, a cell. 

This webpage aims to recreate the Game of Life, allowing users to create an initial grid state and watch the behavior of the system through time

### Motivation

[(Return to table of contents)](#table-of-contents)

I was inspired the moment I saw this automaton while watching [The Art of Code](https://www.youtube.com/watch?v=6avJHaC3C2U&t=34s) and decided to build an interactive system for people to play with

## Features

[(Return to table of contents)](#table-of-contents)

- Click to toggle cells
- Draw to toggle cells
- Run simulation
- Pause simulation
- Retrocede one generation (simulation must be paused to retrocede)
- Advance one generation (simulation must be paused to advance)
- Choose simulation speed using the slider

## Technologies used

[(Return to table of contents)](#table-of-contents)

![TypeScript](https://img.shields.io/badge/-TypeScript-05122A?style=flat&logo=typescript)&nbsp;
![React](https://img.shields.io/badge/-React-05122A?style=flat&logo=react)&nbsp;
![MUI](https://img.shields.io/badge/-MUI-05122A?style=flat&logo=mui)&nbsp;
![styled-components](https://img.shields.io/badge/-styled--components-05122A?style=flat&logo=styled-components)
- react-dom
- immer

## Prerequisites for running this project on your machine

[(Return to table of contents)](#table-of-contents)

- Git installed for cloning the project and managing source code changes. [Official Git page](https://git-scm.com)
- Nodejs installed. It is recommended to use a version manager, such as [nvm](https://github.com/nvm-sh/nvm)

## Install the application locally

[(Return to table of contents)](#table-of-contents)

```
# Clone the repository:
$ git@github.com:fe-sak/game-of-life.git

# Access downloaded folder:
$ cd game-of-life

# Install dependencies: 
$ yarn

_or_

$ npm install
```

Run the app in development mode (run this command inside the project directory):
```
$ npm run start
```

## Learn more about react and how to set it up

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
