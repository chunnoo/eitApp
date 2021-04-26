const setup = (app, passport) => {

    // {username, password} => {valid}
    app.post('/api/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                next(err);
            } else if (!user) {
                res.json({valid: false});
            } else {
                req.logIn(user, (err) => {
                if (err) {
                    next(err);
                } else {
                    res.json({valid: true});
                }
            });
        }
        })(req, res, next);
    });

    // {} => {valid}
    app.post('/api/checkloginstatus', (req, res) => {
        if (req.user) {
            res.json({valid: true});
        } else {
            res.json({valid: false});
        }
    });

    // {} => {username}
    app.post('/api/getusername', (req, res) => {
        res.json({username: req.user});
    })
}

exports.setup = setup;
