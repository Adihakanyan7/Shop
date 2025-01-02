<<<<<<< HEAD
exports.get404 = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        path: '/404',
    });
};
=======
exports.get404 = (req, res, next) =>{
    res.status(404).render('404', { 
        pageTitle: 'Page Not Found',
        path: '/404'
    });
};
>>>>>>> 8bcc4eaade454316f1a36a13b24483ee05ef91ad
