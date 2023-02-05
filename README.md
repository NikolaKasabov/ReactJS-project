### E-comm - our relatively well stocked with reasonably priced products (and non-existent), online store for electronics.

The front end part is created with <b>React</b> and the back end api - with <b>Express</b>.
Database used is <b>MongoDB</b>, hosted at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), and product images are uploaded to [Cloudinary](https://cloudinary.com).
For data fetching is used [axios](https://www.npmjs.com/package/axios).
Authentication is implemented with [JSON Web Tokens](https://jwt.io) and cookies.
For image uploads are used [multer](https://www.npmjs.com/package/multer) and [Cloudinary's API](https://www.npmjs.com/package/cloudinary).

---
This web app has three levels of access: administrator, registered user and guest user.

- The administrator account is automatically created when the Express server is started, if it is not already existing. Only the administrator can add new products to the catalog or delete existing ones.

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
