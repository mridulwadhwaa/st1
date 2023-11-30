// const router=require("express").Router();
// const Movie=require("../models/Movie");
// const movies=require("../config/movies.json")

// router.get("/movies", async(req,res)=>
// {
//     try{
//         const page=parseInt(req.query.page) -1 || 0;
//         const limit=parseInt(req.query.limit) || 5;
//         const search=req.query.search || "";
//         let sort=req.query.sort || "rating";
//         let genre=req.query || "All";

//         const genreOptions=[
//             "Action","Romance","Fantasy","Drama","Crime",
//             "Adventure","thriller","Sci-fi","music","Family"
//         ];
//         genre==="All"
//         ? (genre=[...genreOptions])
//         : (genre=req.query.genre.split(","));
//         req.query.sort ? (sort=req.query.sort.split(",")) 
//                         : (sort=[sort]);

//         let sortBy={};
//         if(sort[1])
//         {
//             sortBy[sort[0]]=sort[1];
//         }
//         else{
//             sortBy[sort[0]]="asc";
//         }
//         const movies=await Movie.find({name:{$regex:search,$options:"i"}})
//         .where("genre")
//         .in([...genre])
//         .sort(sortBy)
//         .skip(page*limit)
//         .limit(limit);

//         const total=await Movie.countDocuments({
//             genre:{$in:[...genre]},
//             name:{$regex:search,$options:"i"},
//         });

//         const response={
//             error:false,
//             total,
//             page:page+1,
//             limit,
//             genres:genreOptions,
//             movies,
//         };
//         res.status(200).json(response);

//     }
//     catch(err)
//     {
//         console.log(err);
//         res.status(500).json({error:true,message:"Internal Server Error"});
//     }
// })

// // const insertMovies=async()=>{
// //     try{
// //         const docs=await Movie.insertMany(movies);
// //         return Promise.resolve(docs);
// //     }
// //     catch(err){
// //         return Promise.reject(err)
// //     }
// // };

// // //function call
// // insertMovies()
// //     .then((docs)=>console.log(docs))
// //     .catch((err)=>console.log(err))

// module.exports=router;

// movieRoutes.js
const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

// Create a movie
router.post('/', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    console.error('Error creating a movie:', error.message);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

// Read all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

// Read a specific movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: true, message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Error fetching a movie:', error.message);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

// Update a movie by ID
router.put('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) {
      return res.status(404).json({ error: true, message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Error updating a movie:', error.message);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

// Delete a movie by ID
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: true, message: 'Movie not found' });
    }
    res.json({ success: true, message: 'Movie deleted successfully' });
  } catch (error) {
    console.error('Error deleting a movie:', error.message);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

module.exports = router;
