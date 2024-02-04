class Patient {
    constructor(
        name = "Alice Johnson",
        age = 50,
        gender = "Female",
        hometown = "Orlando",
        education = "Bachelor's degree in Biology from Florida State University",
        role = "Teacher",
        workExperience = "25 years of teaching science at a high school",
        personalityTraits = "organized, compassionate, curious",
        hobbies = "bird watching, gardening, reading",
        lifeGoals = "publish a nature guide, visit every national park",
        copingStrategies = "meditation, journaling, spending time outdoors",
        diagnosis = "Hypertension",
        vitalSigns = {
            systolicBloodPressure: "140",
            diastolicBloodPressure: "90",
            heartRate: "75",
            respiratoryRate: "18",
            temperature: "98.7"
        },
        labValues = {
            hemoglobin: "13.5 g/dL",
            whiteBloodCellCount: "6.5 x 10^3/uL",
            platelets: "250 x 10^3/uL",
            BUN: "15 mg/dL",
            creatinine: "1.0 mg/dL", 
            potassium: "4.5 mEq/L", 
            sodium: "140 mEq/L",
            chloride: "102 mEq/L"
        },
        imagingReports = {
            xray: "Chest X-ray normal",
            mri: "Brain MRI shows no significant abnormalities",
            ctScan: "Abdominal CT scan normal"
        },
        microbiologyReports = {
            bloodCulture: "No bacterial growth",
            urineCulture: "Normal flora",
            sputumCulture: "Normal respiratory flora"
        }
    ) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.hometown = hometown;
        this.education = education;
        this.role = role;
        this.workExperience = workExperience;
        this.personalityTraits = personalityTraits;
        this.hobbies = hobbies;
        this.lifeGoals = lifeGoals;
        this.copingStrategies = copingStrategies;
        this.diagnosis = diagnosis;
        this.vitalSigns = vitalSigns;
        this.labValues = labValues;
        this.imagingReports = imagingReports;
        this.microbiologyReports = microbiologyReports;
        this.conversation = [
            {"role": "system", "content": `You will simulate the role of a ${role}`},
            {"role": "system", "content": `Your biography is this: ${this.getBiography()}`},
            {"role": "system", "content": "IMPORTANT: When you return data, within the key-value of 'message' you will start off the content with 'Patient:' before you say anything."},
            {"role": "system", "content": `IMPORTANT: You will assume that multiple people are in the conversation. You only speak as yourself *nurse* but understand other people may be contributing to the conversation. Doctor is the user.`}
        ]
    }
    getBiography() {
       return `
       ${this.name} is a ${this.age} year old ${this.gender} from ${this.hometown}. 
       
        Education: ${this.education}
        Work Experience: ${this.workExperience}
        personalityTraits: ${this.personalityTraits}
        Hobbies: ${this.hobbies}
        Life Goals: ${this.lifeGoals}
        Coping Strategies: ${this.copingStrategies}
        
       `
    }
    // Add methods to update or assess patient data, such as a method to update vitals or lab results
}

module.exports = Patient