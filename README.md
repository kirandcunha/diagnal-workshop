# Sample project to implement diagnal workshop

## Folder structure
src |
    | assets - Static images required in the project
    | components - reusable components
    | pages - Full page component
    | store - Redux app store
    | utils - App constants

## Features

1. Lazy loading
App supports lazy loading. Threshold to load next data is configurable from constants.js with the help of integer value LAZY_LOAD_THRESHOLD. It describes how many pages should be below the current scroll for the next set of data to load

2. Local search
App supports local search.
