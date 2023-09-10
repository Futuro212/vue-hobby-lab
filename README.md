# Vue-hobby-lab

This is a tool to have some basic authentication using firebase auth and using Rebrickable API to get information about LEGO sets.

## Objectives
- [X] Using firebase/auth for basic authentication
    - [X] Login / Logout / Register
- [X] Using Brickable API to retrieve info about LEGO sets
- [X] Store lego sets per user logged in
    - [X] Wishlist
    - [X] Owned
- [X] Have Sass installed
- [X] Use Bulma for Styling (with Sass)
- [ ] Styling
    - [X] Navbar
    - [X] Background for Login and Register
    - [X] Login Page
    - [X] Register Page
    - [X] Dashboard Page
        - [X] Greeting component for not logged in
        - [X] Dashboard for logged in
    - [ ] Lego Pagination
        - [ ] Search Box
        - [ ] Set page size
            - [ ] Update Page Params
            - [X] Apply changes on set page size
        - [ ] Pagination
            - [ ] Show page numbers
            - [X] Show next and Previous
        - [X] Set table
            - [X] Set details
            - [X] Link to Lego Detail
    - [X] Lego Detail
        - [X] Add to wishlist
        - [X] Add to "Added"
        - [X] Details of Lego
    - [X] Owned Page
    - [X] Wishlist Page

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
