# Introduction

This is material design template created based on materially structure

# Getting Started

1. Installation process
    - run 'npm install / yarn'
    - start dev server run 'npm run start / yarn start'
2. Deployment process
    - Goto full-version directory and open package.json. Update homepage URL to the production URL
    - Goto full-version directory and run 'npm run build / yarn build'

<!--  -->

# Change note by

react-scripts:4.0.3

#task

1. firebase credentials change on client & server
2. Mongodb account create+ database create and credentials add on server
3. Switch project from Header section
4. Create new project from any page
5. Create new project with redux
6. keywords page design
7. Selected(single) project keywords show manage with redux
8. AI Suggested keywords and user suggested keywords save & manage by redux
9. design mantion page
10. fetch and show data from redux
11. Subscription

# Requirement

1. Overview
2. Mentions
3. Replies
4. Keywords
5. Settings
6. Billings

-   Credits
    1. search
    2. Replies
    3. keywords

https://serper.dev/playground

// src/features/user/userThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserData = createAsyncThunk(
'user/fetchUserData',
async (\_, { getState, dispatch }) => {
const state = getState();
const { accessToken } = state.user;

    try {
      const response = await axios.get('https://api.example.com/user', {
        headers: {
          Authorization: Bearer ${accessToken},
        },
      });
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    }

}
);

zawwadsami@gmail.com
12345678

Serper.dev ei account use koiren @Abu Taher bhai

project

1. cart 3 nos

name, url, desc

keyword white box er votore sob content hobe
keyword

mentions font bold size chnge

keyword remove
max limit keyword allow
duplicate keyword not allow

<!-- task
1. logo change change alignment of project select button
2. SEO conent change
3. after creating project redirect keywords page
4. design project card list
5. keyword color change
6

 -->
