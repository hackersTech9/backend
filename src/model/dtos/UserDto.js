import bCrypt from 'bcrypt';

export default class UsuarioDto {

    roles;
    password;
    email;
    firstname;
    lastname;
    avatar;

    constructor({ _id, email, password, firstname, lastname, avatar, roles }) {
        if (_id === undefined) {
            this._id = undefined;
            this.roles = [];
            this.password = createHash(password)
        }
        else {
            this._id = _id;
            this.roles = roles;
            this.password = password;
        }

        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.avatar = avatar;
    }

    get() {
       
        return {
            email:this.email,
            firstname:this.firstname,
            lastname:this.lastname,
                avatar: this.avatar,
            roles: this.roles
        }
    }


    isValidPassword(password) {
        return bCrypt.compareSync(password, this.password);
    }

    setNewPassword(password) {
        this.password = createHash(password)
    }
    
}

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

