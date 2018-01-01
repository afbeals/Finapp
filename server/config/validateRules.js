module.exports = {
	user_register_rules : {
		first_name: 'required|min:1|max:11',
		last_name: 'required|min:1|max:13',
		email: 'required|email',
		password: 'required|min:7|max:16|alpha_numeric',
		password_confirm: 'required|same:password'
	},
	user_login_rules : {
		email: 'required|email',
		password: 'required'
	}
}
