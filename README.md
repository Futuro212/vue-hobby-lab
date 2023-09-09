# Vue-hobby-lab

This is a tool to have some basic authentication using firebase auth and using Rebrickable API to get information about LEGO sets.

## Objectives
- [X] Using firebase/auth for basic authentication
    - [X] Login / Logout / Register
- [X] Using Brickable API to retrieve info about LEGO sets
- [ ] Store lego sets per user logged in
    - [ ] Wishlist
    - [ ] Owned
- [X] Have Sass installed
- [X] Use Bulma for Styling (with Sass)
- [ ] Styling
    - [X] Navbar
    - [X] Background for Login and Register
    - [X] Login Page
    - [X] Register Page
    - [ ] Dashboard Page
        - [X] Greeting component for not logged in
        - [ ] Dashboard for logged in
    - [ ] Lego Pagination
        - [ ] Set page size
            - [ ] Update Page Params
            - [X] Apply changes on set page size
        - [ ] Pagination
            - [ ] Show page numbers
            - [ ] Show next and Previous
        - [X] Set table
            - [X] Set details
            - [X] Link to Lego Detail
    - [ ] Lego Detail
        - [ ] Add to wishlist
        - [ ] Add to "Added"
        - [ ] Details of Lego

## Things to be fixed
- [X] Logo Sizing in Navbar
- [ ] Background image not repeating horizontally
- [ ] Set table out of bounds in mobile
    

## Firebase and Rebrickable Configurations

For the tool to run you need to get the API keys for firebase and rebrickable, you can check the file .env.example to see what are the values needed to run the application.

Don't forget that you need to create a ".env" file in the root of the project!

## How to Compile and Hot-Reload for Development

```sh
npm run dev
```
