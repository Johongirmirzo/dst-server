"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const sleepEntry_1 = __importDefault(require("./routes/sleepEntry"));
const index_1 = require("./database/index");
const passport_2 = require("./middlewares/passport");
const app = (0, express_1.default)();
// authenticate user through passport strategy
(function () {
  (0, passport_2.localStrategy)();
  (0, passport_2.googleStrategy)();
  (0, passport_2.linkedinStrategy)();
  (0, passport_2.facebookStrategy)();
})();
console.log(process.env.MONGODB_URL);
app.use(
  (0, cors_1.default)({
    origin: "https://daily-sleep-tracker.netlify.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(
  (0, express_session_1.default)({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
  })
);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/auth", auth_1.default);
app.use("/api/sleepEntry", sleepEntry_1.default);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  (0, index_1.connectDB)();
  console.log(`Server is listening at port ${PORT}`);
});
