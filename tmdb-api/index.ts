import express, { Express, response } from "express";
import rateLimit from 'express-rate-limit';
import apicache from 'apicache';
import axios from "axios";
import dotenv from "dotenv";
const app: Express = express();
const cache = apicache.middleware;
const PORT = 8000;



const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: "Too many requests. Please try again in 5 minutes."
})

dotenv.config();

const fetchMovies = async (query: string): Promise<any> => {
  try {
    let result;
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&query=${query}`
      )
      .then((response) => {
        result = response.data.results;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  } catch(error) {
    console.error(error);
  }
}

const fetchMovieById =async (query: string): Promise<any> => {
  try {
    let result;
    await axios
    .get(
      `https://api.themoviedb.org/3/movie/${query}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=1`
    )
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      console.log(error)
    });
    return result;
  } catch(error) {
    console.error(error);
  }
}

const fetchPopular = async (): Promise<any> => {
  try {
    let result;
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=1`
      )
      .then((response) => {
        result = response.data.results;
      })
      .catch((error) => {
        console.log(error)
      });
      return result;
  } catch(error) {
    console.error(error);
  }
}

app.use(cache("5 minutes"), limiter);

app.get('/popular', async (req, res, next) => {
  try {
    const data = await fetchPopular();
    
    return res.status(200).json({
      status:200,
      message: `${data.length} movies found`,
      data
    })
  } catch (err) {
    return next(err);
  }
})

app.get('/search/:title', async (req, res, next) => {
  try {
    const query: string = req.params.title;
    const data = await fetchMovies(query);

    return res.status(200).json({
      status:200,
      data
    })
  } catch (err) {
    return next(err);
  }
})

app.get('/movies/:movie',async (req, res, next) => {
  try {
    const query: string = req.params.movie;
    const data = await fetchMovieById(query);

    return res.status(200).json({
      status: 200,
      data
    })
  } catch (err) {
    return next(err);
  }
})

app.listen(PORT, () => { 
  console.log(`Server started on port ${PORT}`);
});