"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const apicache_1 = __importDefault(require("apicache"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const cache = apicache_1.default.middleware;
const PORT = 8000;
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: "Too many requests. Please try again in 5 minutes."
});
dotenv_1.default.config();
const fetchMovies = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result;
        yield axios_1.default
            .get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&query=${query}`)
            .then((response) => {
            result = response.data.results;
        })
            .catch((error) => {
            console.log(error);
        });
        return result;
    }
    catch (error) {
        console.error(error);
    }
});
const fetchMovieById = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result;
        yield axios_1.default
            .get(`https://api.themoviedb.org/3/movie/${query}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=1`)
            .then((response) => {
            result = response.data;
        })
            .catch((error) => {
            console.log(error);
        });
        return result;
    }
    catch (error) {
        console.error(error);
    }
});
const fetchPopular = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result;
        yield axios_1.default
            .get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=1`)
            .then((response) => {
            result = response.data.results;
        })
            .catch((error) => {
            console.log(error);
        });
        return result;
    }
    catch (error) {
        console.error(error);
    }
});
app.use(cache("5 minutes"), limiter);
app.get('/popular', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetchPopular();
        return res.status(200).json({
            status: 200,
            message: `${data.length} movies found`,
            data
        });
    }
    catch (err) {
        return next(err);
    }
}));
app.get('/search/:title', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.params.title;
        const data = yield fetchMovies(query);
        return res.status(200).json({
            status: 200,
            data
        });
    }
    catch (err) {
        return next(err);
    }
}));
app.get('/movies/:movie', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.params.movie;
        const data = yield fetchMovieById(query);
        return res.status(200).json({
            status: 200,
            data
        });
    }
    catch (err) {
        return next(err);
    }
}));
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
