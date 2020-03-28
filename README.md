#### https://www.codevscovid19.org/
#### CODEvsCOVID19

## Resistance Register

In the near future, rapid tests will be launched on the market to check whether someone has already produced antibodies against corona. our idea is to build a portal where private individuals can register who have already taken the rapid test. this way, the authorities will get an overview of the regions where resistance is already high and where it is even lower. theoretically, people who are resistant could be better employed as nursing staff.

### First Approach
At first the idea is to build a responsive website to register yourself and scan your test id to proof that you are negative.

### Stakeholders

### References
- A corresponding article concerning speed tests for corona which are coming in near future (german): https://www.bosch-presse.de/pressportal/de/de/gegen-corona-pandemie-bosch-entwickelt-covid-19-schnelltest-209792.html
- corresponding article (english) https://www.telegraph.co.uk/news/2020/03/27/coronavirus-covid-19-home-test-kits/
- corresponding article (german) https://www.sueddeutsche.de/gesundheit/coronavirus-test-covid-19-pcr-abstrich-1.4840953


#### How to run the project
- clone the develop branch
- get the env files from discord, move `envFunctions` to the functions folder, move `envSrc` to the root folder
- rename both files to `.env`
- run `npm install -g firebase-tools`
- run `firebase login` and follow the shown instructions
- run `local:env`
- run `npm i` in the root folder
- run `npm i` in the functions folder
##### start dev mode
- run `npm start` in the root folder to start frontend
- run in a second terminal `npm run serve` to serve the backend
- open `localhost:3000` to view the page
