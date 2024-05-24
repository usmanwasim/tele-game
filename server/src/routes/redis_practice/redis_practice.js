const express = require('express');
var router = express.Router();

const axios = require('axios');
const cacheData = require('../../middlewares/redisCache');
const redisClient = require('../../utils/redisConnect');

router.get('/fish/:species', cacheData, async (req, res) => {
  try {
    const species = req.params.species;
    let { data: results } = await axios.get(
      `https://www.fishwatch.gov/api/species/${species}`,
    );
    if (results.length === 0) {
      throw 'API returned an empty array';
    }
    await redisClient.set(species, JSON.stringify(results), {
      EX: 180,
      NX: true,
    });

    res.send({
      fromCache: false,
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(404).send('Data unavailable');
  }
});

module.exports = router;
