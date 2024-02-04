class NPC {
    constructor(bio, role, situation) {
        this.bio = bio;
        this.role = role || "unknown";
        this.situation = situation;

        this.conversation = [
            {"role": "system", "content": `You will simulate/roleplay the role of a ${role}. Your biography is: ${bio}.`},
            {"role": "system", "content": `IMPORTANT: You will respond in the form of JSON strings (WITHOUT LINE BREAKS \n\ etc). Key values will include: {"role": 'role', "message": "'role': message", "sentiment": "sentiment"} (for example, {"role": "patient", "message": "Patient: I am not feeling too well!'", "sentiment": "apprehensive"}). Your sentiment towards the user will change over time and the sentiment will guide your behaviors towards the user."`},
           
        ]   
    }
}

module.exports = NPC