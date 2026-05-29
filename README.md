# StayNest 

StayNest is a hotel booking web app I built using the MERN-adjacent stack (Node, Express, MongoDB — with EJS on the frontend instead of React). 
It is a full-stack hotel booking web application I built to practice backend development and create something that feels like a real-world product. 
Users can explore hotel listings, create their own listings, book stays, leave reviews, and manage bookings — all with authentication and a clean responsive UI.
It lets users browse hotel listings, make bookings, write reviews, and manage their own properties. I built it to get hands-on with full-stack development, auth flows, file uploads, and the general messiness of building something that actually works end-to-end.
The goal of this project was to understand how a complete booking platform works, including authentication, database relationships, image uploads, booking logic, and CRUD operations.

## What it does

- Sign up, log in, stay logged in (sessions + Passport.js)
- Add your own hotel listings, edit them, delete them
- Book a stay at any listing, cancel if plans change
- Leave reviews and ratings on hotels you've stayed at
- Upload hotel images (handled via Cloudinary + Multer)
- Owners can view and manage bookings on their listings
- Flash messages for feedback, proper error handling throughout
- Works decently on mobile too

## Tech

**Frontend** — HTML, CSS, Js, Bootstrap, EJS templating

**Backend** — Node.js, Express.js

**Database** — MongoDB with Mongoose

**Auth & everything else** — Passport.js, Express Session, Multer, Cloudinary, Connect-Flash, Method-Override

## Folder structure

```bash
StayNest/
│
├── models/
├── routes/
├── controllers/
├── views/
├── public/
├── middleware/
├── utils/
├── app.js
├── package.json
└── README.md
```

## Running it locally

```bash
# Clone and enter the project
git clone https://github.com/VELPURITHANISHK/STAYNEST.git
cd STAYNEST

# Install dependencies
npm install

# Start the server
node app.js
```

## Environment variables

Create a `.env` file in the root and fill these in:

```env
ATLASDB_URL=your_mongodb_connection_url
SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

## Author

Built by **Thanishk Velpuri** — [@VELPURITHANISHK](https://github.com/VELPURITHANISHK)

## License

This project is open-source and available under the MIT License.

---
