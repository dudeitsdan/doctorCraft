export class Disease {
    constructor () {
        this.name = name || "N/A"
        this.age = 36 || "N/A"
        
        this.pastMedicalHistory = [];

        this.chiefComplaint = chiefComplaint || "cough"
        
        //Subjective History Complaints
        this.symptoms = [];
        this.reviewOfSystems = [];
        this.allergies = [];
        this.pastSurgicalHistory = [];

        //labs
        
        this.BMP {
            creatinine: creatinine || 0.9,
            BUN: BUN || 20,

        };

        // imaging
        this.chestXray = { 
            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/X-ray_of_lobar_pneumonia.jpg/1280px-X-ray_of_lobar_pneumonia.jpg"
        };

        this.diseaseName = || "N/A"

    }

    HPwriter() {
        return `
            History and Physical

            ${name}} is a ${} year old 
        `
    }
}