class Contact {
  constructor({ fullName, companyName, email, phone, issue, channel, request, terms }) {
    this.fullName = fullName;
    this.companyName = companyName; 
    this.email = email;
    this.phone = phone;
    this.issue = issue;
    this.channel = channel;
    this.request = request;
    this.terms = terms;
  }
}
module.exports = Contact;
