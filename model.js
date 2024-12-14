const mongoose = require('mongoose');

const artifactSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true,  },
    description: { type: String, required: true }
});

const Artifact = mongoose.model('Artifact', artifactSchema);

module.exports = Artifact;
