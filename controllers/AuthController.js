const passport = require("passport");
require("../config/passport");
const dotenv = require("dotenv");
dotenv.config();
async function Login(req, res, next) {
  passport.authenticate("google", function (err, userData, info) {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" + err });
    }
    if (!userData)
      return res
        .status(401)
        .json({ message: "Invalid Credential or user denied access" });
    req.logIn(userData, (err) => {
      if (err)
        res.send(`
                    <h2 style="color: red;">Error: ${err}</h2>
                    <p><a href="/">Go Back</a></p>
                `);
      res.send(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Dashboard</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                text-align: center;
                                margin: 50px;
                                background-color: #f4f4f4;
                            }
                            .container {
                                background: white;
                                padding: 20px;
                                border-radius: 10px;
                                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                                max-width: 400px;
                                margin: auto;
                            }
                            h2 {
                                color: #333;
                            }
                            p {
                                font-size: 18px;
                                margin-top: 10px;
                            }
                            a {
                                display: inline-block;
                                text-decoration: none;
                                background: #007BFF;
                                color: white;
                                padding: 10px 20px;
                                border-radius: 5px;
                                margin-top: 15px;
                            }
                            a:hover {
                                background: #0056b3;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h2>🎉 Welcome, ${userData.name}!</h2>
                            <p>We're glad to have you here.</p>
                            <a href="/">🏠 Go Back</a>
                        </div>
                    </body>
                    </html>
                `);
    });
  })(req, res, next);
}
const GoogleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});
function Logout(req, res) {
  res.Logout(() => {
    res.redirect("/");
  });
}
module.exports = { Logout, GoogleAuth, Login };
