const express = require('express');
const {
    createArtifact,getArtifacts,updateArtifact,deleteArtifact
} = require('./artifactController');

const router = express.Router();

router.post('/create', createArtifact);
router.get('/get', getArtifacts);
router.put('/update', updateArtifact);
router.delete('/delete/:id', deleteArtifact);
module.exports = router;
