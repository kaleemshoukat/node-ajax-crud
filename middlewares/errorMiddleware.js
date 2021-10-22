
exports.show_file = (req, res, next) => {
    res.status(404).render("errors/404.ejs", {layout: './layouts/guest'})
}