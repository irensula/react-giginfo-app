const express = require('express');
const router = express.Router();
const Gig = require('../models/gig');
let isAuthenticated = require('../middleware/auth');
const validateSchema = require('../middleware/validate');
let gigschema = require('../schemas/gigschema.json');

router.get('/', async (req, res) => {
    try {
      const gigs = await Gig.find({});
      res.json(gigs);
    } catch (error) {
      console.error('Error fetching gigs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
// add gig  
router.post('/', isAuthenticated, validateSchema(gigschema), async (req, res, next) => {
    
    const userId = res.locals.auth.userId;
    const body = req.body
    
    if (!body.name?.trim() ||
        !body.artist?.trim() ||
        !body.add_image?.trim() ||
        !body.description?.trim() ||
        !body.gig_date?.trim() ||
        !body.time?.trim() ||
        !body.address?.trim() ||
        !body.city?.trim() ||
        !body.ticket_sale_link?.trim() ||
        !body.genre?.trim() ||
        !body.artist_link?.trim()
    ) {
        return res.status(400).json({ error: 'All fields must be filled' });
    }
    try {
        const capitalize = (str) =>
            str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;
        
        const gig = new Gig({
            name: capitalize(body.name),
            artist: capitalize(body.artist), 
            add_image: body.add_image,
            description: capitalize(body.description),
            gig_date: new Date(body.gig_date),
            time: body.time,
            address: capitalize(body.address),
            city: capitalize(body.city),
            ticket_sale_link: body.ticket_sale_link,
            genre: body.genre,
            artist_link: body.artist_link,
            rate: body.rate,
            user_id: userId
        });

        const savedGig = await gig.save();
        res.status(201).json(savedGig);
    } catch (error) {
        console.error("Error saving gig:", error);
        next(error);
    }
})  
// get gig by id
router.get('/:id', async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if (!gig) {
            return res.status(404).json({ error: "Gig not found" });
        }
        res.json(gig);
    } catch (error) {
        console.error("Error getting gig by id:", error);
        next(error);
    }
});     
// delete gig by id
router.delete('/:id', isAuthenticated, async (req, res, next) => {
    const userId = res.locals.auth.userId;
    try {
        const gig = await Gig.findById(req.params.id);
        if (!gig) {
            return res.status(404).json({ error: "Gig not found" });
        }
        if (gig.user_id.toString() !== userId) {
            return res.status(403).json({ error: "Not authorized to delete this gig" });
        }
        await gig.deleteOne();
        res.status(204).end();
    }  catch (error) {
        console.error("Error deleting gig:", error);
        next(error);
    }
});  
// update gig by id
router.put('/:id', isAuthenticated, validateSchema(gigschema), async (req, res, next) => {
    const userId = res.locals.auth.userId;
    const body = req.body
  
    try {
        const existingGig = await Gig.findById(req.params.id);
        if (!existingGig) {
            return res.status(404).json({ error: "Gig not found" });
        }
        if (existingGig.user_id.toString() !== userId) {
            return res.status(403).json({ error: "Not authorized to update this gig" });
        }

        const updatedData = {
        name: body.name?.trim(),
        artist: body.artist?.trim(), 
        add_image: body.add_image?.trim(),
        description: body.description?.trim(),
        gig_date: new Date(body.gig_date),
        time: body.time?.trim(),
        address: body.address?.trim(),
        city: body.city?.trim(),
        ticket_sale_link: body.ticket_sale_link?.trim(),
        genre: body.genre?.trim(),
        artist_link: body.artist_link?.trim()
    }
        console.log(updatedData);
        console.log("Date",updatedData.gig_date);
        const updatedGig = await Gig.findByIdAndUpdate(req.params.id, updatedData, { new: true })
        res.json(updatedGig);  
    } catch(error) {
        console.error("Error updating this gig:", error);
        next(error);
    } 
  })

module.exports = router;