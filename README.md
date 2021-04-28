# next-sunny-day 
A Next.js v10 app with localization for `en` and `es` that tells you when the next sunny day will happen in your location.

## Content
- [Getting Started](#getting-started)
  - [Running Locally](#running-locally)
    - [Generate Self Signed Certificates](#generate-self-signed-certificates)
    - [Run the server](#run-the-server)
  - [Localization](#localization)
- [Project Requirements](#project-requirements)  
- [User Stories](#user-stories)
- [Known Issues](#known-issues)
- [Contributions](#contributions)
- [To Dos](./TODO.md)  
- [License](./LICENSE)

## Getting Started
### Installing
Prefer `yarn` with Next.js because it offers features such as `resolutions`. If you do not currently have yarn installed then run the following:
```bash
brew install yarn
# or
npm install --global yarn
# but that is like downloading Chrome with Edge
```
then when installed simply run the following
```bash
yarn
# or
yarn install
```

### Running Locally

#### Generate Self Signed Certificates
From the app directory run the following command
```bash
mkdir certificates 
```
then `cd certificates` and run the following

```bash
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -days 365 \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost:3000' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```
Congrats! You now have a virus! I'm kidding. You now have the certs available to run locally but there may be additional steps needed.

*macOS* requires making changes in Keychain Access so that your certs are always trusted.

#### Run the server
First, run the development server:
```bash
yarn dev
```
Open [https://localhost:3000](https://localhost:3000) with your browser (Firefox preferably) to see the result.

### Localization
To view the Spanish localization you need to visit [https://localhost:3000/es](https://localhost:3000/es)

## Project Requirements
> The UI implementation should **prompt for a location**, and **display
the resulting weather**... and **display the information you feel is relevant**.(sic)

## User Stories
```gherkin
Given a user opens the web application
  Then they will be prompted by the browser to allow the device to access their location
  
Given a user allows the device to access their location
  Then they will see relevant weather information

Given a user does not allow the device to access their location
  Then they will be presented with a 'Request to allow access' message

Given a user's device does not support geolocation
  Then they will be presented with a 'Device not supported' message 
```

## Known Issues
- self-signed certificates in Chrome may still not allow `navigation.location` to work properly resulting in the application not working.

## Contributions
¯\_(ツ)_/¯
