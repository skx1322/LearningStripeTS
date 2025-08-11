# Introduction
Trying to learn about way to implement payment gateway by creating a fullstack ecommerce website using ReactJS and ElysiaJS. [More Documentation soon, for myself.]


![alt text](./image/FuHuaThumbsup.png)
# API / Techs
1. MongoDB 
2. Stripe API
3. OAuth Client ID/Secret

3A. DigitalOcean Storage Bucket


# Development 
## Client
For our client aka our frontend service, it is done using Vite and ReactJS framework. The client utilizes react-router-dom for the multipage routing and tailwindcss for the styling. 

If you want to run the client in your local device, you are required to use either NodeJS or Bun, both are acceptable and could run but I highly recommended Bun as the whole development process was done in the Bun runtime on both ends.

1. Runtime Selection
- Select either NodeJS or Bun, install the proper version and variant that will fit in your operating system.

2. Git clone the repository
- Once you have the runtime setup, you should git clone the repository into your local device.
```
git clone https://github.com/skx1322/LearningStripeTS.git
```

3. Directory and Install Modules
- When it is cloned, navigate into the client/ directory within the project and tried to install the modules.
For NodeJS:
```
cd client
npm install
```

For Bun:
```
cd client
bun install
```
- You'll see Node/Bun start installing the modules according to the package.json dependencies.

4. Environment
- To connect to your local server, you may refer to .env.example for a reference and you will only need to create an ".env" file and setup the backend URL really which by default should be http://localhost:8080. If your server/backend have different URL output for instance if you use other port, please change this part of the env file. 
(.env)
```
VITE_BACKEND_URL = http://localhost:8080
```

## 
[work in progress]

# About
Placeholder image btw! Totally not gonna use it until the end of the project (not guarantee!!)

![alt text](./image/HerrscherOfScammer1.png)

Herrscher of Scammer (Placeholder!)