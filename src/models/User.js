class User {
    constructor(id, name, email, passwordHash, createdAt){
        this.id= id;
        this.name = name;
        this.email = email.toLowerCase();
        this.passwordHash = passwordHash;
        this.createdAt = createdAt || new Date().toISOString();
    }
}

module.exports = User;