export function estaLogeado(req, res, next) {
 /*   req.isAuthenticated = function() {
        var property = 'user';
        if (this._passport && this._passport.instance) {
          property = this._passport.instance._userProperty || 'user';
        }
        
        return (this[property]) ? true : false;
    };
    */
    if (req.isAuthenticated()){
        return next();
    }else{
        return res.redirect('/iniciarsesion');
    }
};

export function noLogeado(req, res, next) {
    if (!req.isAuthenticated()){
        return next();
    }else{
        return res.redirect('/profile');
    }
};
//export default estaLogeado;