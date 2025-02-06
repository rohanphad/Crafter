const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const googleAuthRoutes = require("./routes/googleAuthRoutes");
const connectDB = require("./config/db");
const session = require("express-session");
const passport = require("passport");
const User = require("./models/userModel");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

dotenv.config();
connectDB();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Specify the exact frontend URL
    credentials: true, // Allow cookies to be sent with requests
    methods: "GET,POST,PUT,DELETE", // Allow GET and POST methods (adjust as needed)
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "50mb" })); // You can adjust this size as needed
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRoutes);
app.use("/auth/google", googleAuthRoutes);
app.use("/api/portfolios", portfolioRoutes);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("checking google profile", profile);
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
          await user.save();
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

app.get("/logout", (req, res) => {
  console.log("logout called");
  res.clearCookie("token");
  res.redirect("http://localhost:5173");
});

app.listen(
  process.env.PORT,
  console.log(`server is running on port ${process.env.PORT}`)
);
