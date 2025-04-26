class UserProfile {
    constructor( id, name, email, phone= '', document= '', city= '', department= '' ){
        this.id = id,
        this.name = name,
        this.email = email.toLowerCase();
        this.phone = phone,
        this.document = document,
        this.city = city,
        this.department = department
    }
}

module.exports = UserProfile;