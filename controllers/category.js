exports.categoryController = (req, res) => {
    setTimeout(() => {
        res.json({
            successMessage: `${req.body.category} was added`
        });
    }, 8000);
}