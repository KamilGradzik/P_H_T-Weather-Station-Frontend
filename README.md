# **PHT Weather Station - Frontend(Outdated)**
## Outdated version, newer could be find on my Github
## **General info**

<br>

    PHT is a project created by group of students. The project goal was to create a Service that will measure
    temperature, air humidity and pollution in the cities of Częstochowa, Myszków and Krzepice
    located in Silesia in Poland.

<br>

## **About**

<br>

    It's a React.js application that represents weather data based on selected weather station. 
    Upoun entering the application you will be asked to select city or you can directly enter url page with city id, 
    after selecting city you will be redirected to main page. Here weather data will be displayed in tiles in an hourly interval.
    User can click on the tile to get more specifed data with will be represented in modal.
    In main page you can switch city using navbar also using navbar you can switch language.

<br>

## **Setup application**

    1. Install Node.js from https://nodejs.org/en
    2. Open Project with any environment or system terminal
    3. Run command npm i
    4. Run command npm start
    5. Open http://localhost:3000 in the browser
    6. Application is ready to use.

## **How it works?**
    
    1. On first run app calls two endpoints to get cities and sensors.
    2. Based on selected city app ask backend for data via specifed endpoint.
    3. App renders tiles with data from backend endpoints.
    4. On tile click, app redner modal with more specifed data from every 15 minutes.

## **Assets credits**

Landing page - background video 
<br>
https://www.videezy.com/clouds/44293-clouds-moving-around-background
<br>

<br>
Reading tiles - backround images
<br>
https://www.reddit.com/r/iOSthemes/
