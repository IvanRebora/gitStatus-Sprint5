
const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs')
const userModel = require('../model/userModel.js');
//const jsonDatabase = require('../model/jsonDatabase');

let userController = {
    register: (req, res) => {
        res.render('register');
    },

    processRegister: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = userModel.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			fileavatar: req.file.filename
		}

		let userCreated = userModel.create(userToCreate);

		return res.redirect('/login');
	},
     /*store: (req, res) => {
        console.log('entre al storess')
        console.log(req.body)

        let errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.render('login', {errors: errors.errors})
        } 
            req.session.email = req.body.email
            req.session.password = req.body.password
            let hash = bcryptjs.hashSync(req.body.password, 10)
            console.log(hash);
            console.log(bcryptjs.compareSync(req.body.password, hash));
            
			req.body.password = hash;
            req.body.confirmpass = hash;
            
            let userInDB=userModel.findByField('email',req.body.email)
            if(userInDB){
                return res.render('register', {
                    errors:{
                        email:{
                            msg:'Este email ya está registrado'
                        }
                    },
                    oldData:req.body
                })
            }
      
        

        const users = req.body;
        productModel.create(users);
        res.redirect('/')
    },*/

    login: (req, res) => {
        if(req.session.name){
            let data = req.session
            return res.render('login', {data})
        }
        res.render('login')
    },

    //ACA ESTA PASANDO EL ERROR 
	loginProcess: (req, res) => {
		let userToLogin = userModel.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('email', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/');
			} 
			return res.render('login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},

    profile: (req, res) => {
		return res.render('profile', {
			user: req.session.userLogged
		});
	},

	logout: (req, res) => {
		res.clearCookie('email');
		req.session.destroy();
		return res.redirect('/');
	}


}



module.exports = userController