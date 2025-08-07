# Introduction 

# Localhost
## ONLY FOR DEVELOPER WITH REACTJS / VITE EXPERIENCE 
1. If you want to host this code locally, you may choose this method if you want to modify the code. First, you need either NodeJS or Bun install and the latest version is always the safest choice here.

### NodeJS
https://nodejs.org/en
(Make sure to select the right OS)

### BunSH
https://bun.com/
(Make sure to select the right OS)

2. Once NodeJS or BunSH is installed, you may try to git clone the repository to your local machine by doing
```
git clone https://github.com/skx1322/HealthX_LandingPage.git
git branch localhost_test
git checkout localhost_test
```

3. Once cloned, you can start running the codebase after your directory is inside of the folder. 

First, open terminal of the code.
![alt text](image-2.png)

(Make sure you're really in the right directory, you'll see these if you type `ls` in terminal)
![alt text](image-3.png)

Once you're sure, you may start install the libraries, if you're using NodeJS, do this:
```
npm install
npm run dev
```

However you're using Bun, do this instead:
```
bun install
bun run dev
```

The install step will tried to install all the neccesaries libraries and once done, you can start running the app by doing running dev. When you run dev locally, it'll show that your device hosted the website on localhost:5173 which you can access by going to the url of it. http://localhost:5173/

