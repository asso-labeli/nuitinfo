# Nuit de l'Info Bordeaux - WebSite

## Server instructions

### Configuration

Rename the `/server/config/local.env.default.js` to `/server/config/local.env.js`, and add your configuration to this file.

### Authentication

When you `POST /login` and your credentials are good, you will receive a **token** in the response.
Insert the token in the **Authorization** header preceded by the string `JWT`.
For example : 

`
Authorization: JWT  XAiOiJKV1QiLCJOiJIUzI1NiJ9.eyJpZCI6IjU3ZmRmMzhk
`

When you want to logout, just remove the token from your application.