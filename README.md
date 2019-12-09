# SoftUni-ReactJS-project
## This is a project for SoftUni ReactJS course.
---
### E-comm - our relatively well stocked with reasonably priced products (and non-existent), online store for electronics.

The front end part is created with <b>React</b> and the back end api - with <b>Express</b>.
Database used is <b>MongoDB</b>, hosted at MongoDB Atlas, and products pictures are uploaded to Cloudinary.com.

---
This web app has three levels of access: administrator, registered user and guest user.

- The administrator account is automatically created when the Express server is started, if it is not already existing. Only the administrator can add new products to the catalog or delete them.

- After registration and subsequent successful Login to the system, a registered user can add products to his shopping cart and purchase them.

- A guest user can browse the products, but can't shop.
---
## Resolve Dependencies
When the project is cloned or downloaded, type in the terminal the following in both Server (BackEnd-ExpressJS) and Client (frontend-reactjs) directory:
```
npm install
```
## Run the server
To run the web server type in terminal, in BackEnd-ExpressJS directory, the following:
```
npm start
```
## Run the React app
To run the React app type in terminal, in frontend-reactjs directory, the following:
```
npm start
```
By default the React app runs on localhost:3000, and the Express server runs on localhost:5000.