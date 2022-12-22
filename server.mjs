
////===============>> starting  <<=============\\\\



import express from "express";
import cors from "cors";
import path from "path";
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import {
    stringToHash,
    varifyHash,
} from "bcrypt-inzi";
import mongoose from "mongoose";

const SECRET = process.env.SECRET || 'secuirity';

const app = express();

const port = process.env.PORT || 5001;


const mongodbURI = process.env.mongodbURI || 'mongodb+srv://MairajK:workhardin@cluster0.sihvwcq.mongodb.net/estore?retryWrites=true&w=majority';


app.use(cors());
app.use(express.json());




const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

});


const userModel = mongoose.model('Users', userSchema);

app.post('/signup', (req, res) => {

    let body = req.body;


    if (
        !body.firstName
        ||
        !body.lastName
        ||
        !body.email
        ||
        !body.password
    ) {
        res.status(400).send(
            `required fields missing, example request : 
            {
                firstName : 'Mairaj',
                lastName : 'Khan',
                email : 'abc@123.com',
                password : '*******'
            }`
        );
        return;
    }

    req.body.email = req.body.email.toLowerCase();

    userModel.findOne({ email: body.email }, (err, user) => {
        if (!err) {
            console.log('user ===> ', user);

            if (user) {
                console.log('user exist already ===>', user);

                res.status(400).send({
                    message: 'this email is already exist please try a different one.'
                });
                return;
            } else {

                stringToHash(body.password).then(hashedPassword => {
                    userModel.create({
                        firstName: body.firstName,
                        lastName: body.lastName,
                        email: body.email,
                        guard: hashedPassword
                    },
                        (err, user) => {
                            if (!err) {
                                console.log('user created ==> ', user);
                                res.status(201).send({
                                    message: 'user created successfully'
                                });
                            } else {
                                console.log("server error: ", err);
                                res.status(500).send({
                                    message: "server error",
                                    error: err
                                });
                            }
                        })
                })

            }
        } else {
            console.log("error ===> ", err);
            res.status(500).send({
                message: "server error",
                error: err
            });
            return;
        }
    })
})



const __dirname = path.resolve();

app.use("/", express.static(path.join(__dirname, "./web/build")));
app.use("*", express.static(path.join(__dirname, "./web/build/index.html")));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});




mongoose.connect(mongodbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
