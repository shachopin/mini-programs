 Originally for vite, there is no public folder
 in vite.config.js you added: publicDir: 'assets', by default it will be "public" without configuring
 then after deployed to netlify
 these work fine:
 https://dawei-mini-programs.netlify.app/two-pointers/ the plain html
 https://dawei-mini-programs.netlify.app the react app entry
 
 in netlify it will do npm run build and generate dist folder
 because on netlify, by default, react router won't be respected, so  https://dawei-mini-programs.netlify.app/two-pointers/ works
 for react router to work, you need add a _redirects file under public when in react-script server content is /*    /index.html   200
 not sure about vite
 
 on glitch, it secretly does npm run build and servers up the local dist folder
 however on glitch it always honors react router first,  so https://<glitch address>/two-pointers/ doesn't work
 you need to always append html in the end
  
 ref https://www.youtube.com/watch?v=Y3yCB7CfjF4