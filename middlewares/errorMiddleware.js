
exports.show_file = (req, res, next) => {
    res.status(401).render("errors/401.ejs", {layout: './layouts/guest'})
    res.status(403).render("errors/403.ejs", {layout: './layouts/guest'})
    res.status(404).render("errors/404.ejs", {layout: './layouts/guest'})
}