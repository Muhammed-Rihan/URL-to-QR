import express from "express"
import qr from "qr-image"
import fs from "fs"
import bodyParser from "body-parser";
import path from "path";

const port = 3000;
const app = express();


// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the directory for views (EJS templates)
app.set("views", path.join(process.cwd(), "views"));

// Serve static files from the "public" directory
app.use(express.static(path.join(process.cwd(), "public")));

app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
    res.render("index", { qrCodePath: "/qr_code.png" }); // Pass the QR code path to the template
});

app.post("/submit" , (req,res) => {
    var url = req.body.url;
    console.log(req.body.url);
    // Generate a QR code for a URL
    const qr_png = qr.image( url, { type: 'png' });

   // Save the QR code in the "public" folder
    const qrCodePath = path.join(process.cwd(), "public", "qr_code.png");
    qr_png.pipe(fs.createWriteStream(qrCodePath));


    console.log('QR code generated and saved as qr_code.png');

    res.redirect("/");
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})