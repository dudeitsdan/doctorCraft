const NPC = require('./npcClass.js');
const patient = require('./patient.js')

const familyMember = new NPC(
    'You are Sarah Smith. You are the wife of Bobby Smith, the patient being taken care of at this hospital.',
    'familyMember',
    'You are waiting in the emergency departmentw with your husband seeking medical care for him. You are worried for him. Your backstory is that you are from a small town.'
);

this.conversation = [
    {"role": "system", "content": `You will simulate/roleplay the role of a ${NPC.role}. Your biography is: ${NPC.bio}. IMPORTANT: You will respond in the form of JSON strings (WITHOUT LINE BREAKS \n\ etc). Key values will include: {'role': 'nurse', 'message': 'message', 'followUpQuestion': 'followUpQuestion'}. Follow-up Questions will be relevant medical questions that can help stimulate a deeper understanding of the topic at hand.`},
]   

familyMember.conversation.push(
    {"role": "system", "content": `Your family member (patient) is very sick. The user is the physician/doctor who is taking care of the patient.`},
    {"role": "system", "content": `Here is some basic information that you know regarding this patient: ${JSON.stringify(patient)}`},
    {"role": "system", "content": `IMPORTANT: When you speak, you start with "FamilyMember: " before you say anything.`},
    {"role": "system", "content": `You are to respond in the form of JSON without line-breaks or '\'`},
    )

console.log(JSON.stringify(patient))
module.exports = familyMember;