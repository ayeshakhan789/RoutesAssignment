const Artifact = require('./model');

exports.createArtifact = async (req, res) => {
   const { id, name, description } = req.body;
    if (!id || !name || !description) {
        return res.status(400).json({ message: "ID, name, and description are required" });
    }
    try {
        const newArtifact = new Artifact({ id, name, description });
        await newArtifact.save(); 
        res.cookie('artifactId', id); 
        res.status(201).json({ message: "Artifact created successfully", artifact: newArtifact });
    } catch (err) {
        console.error("Error creating artifact:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getArtifacts = async (req, res) => {
    try {
        const artifacts = await Artifact.find();
        res.status(200).json({ artifacts });  
    } catch (err) {
        console.error("Error fetching artifacts:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.updateArtifact = async (req, res) => {
    const { id } = req.body;
    const { name, description } = req.body;
    if (!id || !name || !description) {
        return res.status(400).json({ message: "ID, name, and description are required" });
    }
    try {
        const updatedArtifact = await Artifact.findOneAndUpdate(
            { id }, 
            { name, description }, 
            { new: true } 
        );
        if (!updatedArtifact) {
            return res.status(404).json({ message: "Artifact not found" });
        }
        res.status(200).json({ message: "Artifact updated successfully", artifact: updatedArtifact });
    } catch (err) {
        console.error("Error updating artifact:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteArtifact = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedArtifact = await Artifact.findOneAndDelete({ id });
        if (!deletedArtifact) {
            return res.status(404).json({ message: "Artifact not found" });
        }
        res.status(200).json({ message: "Artifact deleted successfully", artifact: deletedArtifact });
    } catch (err) {
        console.error("Error deleting artifact:", err);
        res.status(500).json({ error: err.message });
    }
};
