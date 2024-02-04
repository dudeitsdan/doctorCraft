class testResult {
    constructor (value, importance) {
       this.value=value||"unknown";
       this.isImportant=importance||"false";
       this.isOrdered=false;
       this.isAvailable=false;
       
    }
 }

 module.exports = testResult;