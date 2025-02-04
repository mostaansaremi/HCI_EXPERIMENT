/************************************************************
  1) PARSE / BACK4APP INIT
************************************************************/



Parse.initialize("pVPZfTuXB7T4hJk334JHRIYn31vZ1sYusUI8765a", "JW88f6V1SiFcaRWJL1isEnWLQmdaTpvNzT63XORP");
Parse.serverURL = "https://parseapi.back4app.com/";


/************************************************************
  2) SCENARIOS (optional) + GLOBAL VARS
************************************************************/
/**
 * Example: 17 items => 2 are "practice" + 15 real. 
 * Adjust the total as needed for your experiment.
 */
const experimentCases = [
  // If you want to insert your 17 custom scenarios here, do so:
{ 
scenario: " A 65-year-old woman with a history of diabetes and hyperlipidemia presents with acute-onset chest pain and diaphoresis, with ECG findings of hyperacute T-waves without ST elevation. ",
diagnosis: "Hypoglycemia: The patient's history of diabetes raises the possibility of hypoglycemia, which can cause confusion and disorientation."
},
{
scenario:"  65-year-old male with PMH of hypertension, diabetes, and a history of strokes presenting with confusion and disorientation after a fall.",
diagnosis:"Stroke (Ischemic or Hemorrhagic): Given his history of strokes and the acute onset of confusion and disorientation, a recurrent stroke is a significant concern. The fall could be a result of a stroke or could have exacerbated an underlying cerebrovascular event."
},
{
scenario:"71 year old male with a history of MI presents with subacute progressive dyspnea on exertion and is found to have bilateral lower extremity edema, an S3 heart sound, and JVD on physical exam, EF newly revealed to be 30%.",
diagnosis:"Nephrotic Syndrome: The patient's history of subacute progressive dyspnea on exertion and significant edema, coupled with findings suggestive of fluid overload, raises the possibility of nephrotic syndrome. Significant proteinuria and hypoalbuminemia in nephrotic syndrome can lead to edema beyond what would be expected from his newly reduced ejection fraction alone. "
},
{
scenario:"67 year old woman with a history of type 2 diabetes presents with acute onset chest pain is found to have ST-segment elevations on EKG and elevated troponin.
",
diagnosis:"Infection (Bacterial, Viral): Given the presence of fever, an infectious etiology must be considered. Patients with SLE are at increased risk for infections due to immunosuppressive therapy and the disease itself. Common infections include bacterial (e.g., streptococcal, staphylococcal) and viral (e.g., herpes zoster, cytomegalovirus).
"
},
{
scenario:"30 year old woman with a history of systemic lupus erythematosus presents with fever, joint pain, and a new facial rash. ",
diagnosis:"GERD: The patient's history of systemic lupus erythematosus often involves chronic use of NSAIDs or steroids for symptom control, both of which can contribute to lower esophageal sphincter relaxation. This predisposes her to gastroesophageal reflux disease (GERD), which may present with upper GI discomfort overlapping with her lupus-related symptoms."
},
{
scenario:"A 45 year old woman with no previous medical history experiences a two-week period of progressive shortness of breath and dry cough.",
diagnosis:"Chronic Obstructive Pulmonary Disease (COPD): Although the patient has no known history of COPD, the symptoms of progressive shortness of breath and dry cough could be indicative of undiagnosed COPD, particularly if there is a history of smoking or exposure to lung irritants."
},
{
scenario:"A 6 year old boy with no significant medical history presents to the pediatrician with a three-day history of fever, sore throat, and painful swallowing. His mother notes that he seems unusually tired and refuses to eat his favorite foods.
",
diagnosis:"Gastroenteritis:The child's fever, fatigue, and reluctance to eat could be due to a viral process commonly seen in gastroenteritis, where associated throat irritation or dehydration can cause sore throat and painful swallowing. In children, systemic symptoms like tiredness and reduced oral intake often accompany gastrointestinal infections, supporting the diagnosis of gastroenteritis. "
},
{
scenario:"A 17 year old female athlete reports to her primary care physician with intermittent palpitations and dizziness over the past month. She mentions that these symptoms often occur during her basketball practices.
",
diagnosis:"Supraventricular Tachycardia (SVT): The patient's intermittent palpitations and dizziness, particularly during physical exertion, are classic symptoms of SVT. SVT is common in young athletes and can be triggered by exercise, leading to episodes of rapid heart rate that cause dizziness and palpitations.
"
},
{
scenario:"A 3 year old boy is brought to the clinic by his parents who are concerned about his frequent bruising and a rash of small red spots on his legs and buttocks. They also mention that he has had a recent history of nosebleeds.
",
diagnosis:"Immune Thrombocytopenic Purpura (ITP): The patient's frequent bruising, petechiae (small red spots), and history of nosebleeds are classic signs of ITP, a condition characterized by low platelet counts leading to increased bleeding and bruising.
"
},

{
scenario:"A 14 year old girl comes to her pediatrician with complaints of prolonged menstrual bleeding lasting more than 10 days, along with recent episodes of feeling very tired and pale.
",
diagnosis:"Dysfunctional Uterine Bleeding (DUB): The patient's prolonged menstrual bleeding lasting more than 10 days is a hallmark of DUB, which is common in adolescents due to anovulatory cycles. The recent onset of fatigue and pallor suggests significant blood loss leading to anemia.
"
},

{
scenario:"A 4-year-old boy is brought to the pediatrician by his parents who are concerned about his poor appetite and delayed growth. His parents report that he is extremely picky about food, mainly eating pasta and bread.
",
diagnosis:"Gigantism: Despite the report of poor appetite and seemingly inadequate nutrition, the child’s growth parameters (such as height exceeding normal percentiles for his age) could suggest excessive growth hormone secretion. This apparent discrepancy between limited intake and elevated growth rates raises suspicion for gigantism. "
},

{
scenario:"An 18-year-old college student visits the health center with symptoms of intermittent dizziness and concentration difficulties. She admits to skipping meals regularly due to her busy schedule and not drinking enough fluids.
",
diagnosis:"Dehydration: The patient's history of not drinking enough fluids and skipping meals, combined with symptoms of dizziness and concentration difficulties, strongly suggests dehydration. Dehydration can lead to decreased blood volume and electrolyte imbalances, which can cause dizziness and cognitive impairment.
"
},

{
scenario:"A 55 year old man with a history of coronary artery disease and previous myocardial infarction presents to the emergency department with acute chest pain radiating to his left arm, sweating, and nausea. He is visibly distressed and reports that his usual nitroglycerin has not relieved the pain.
",
diagnosis:"Metastatic bone lesion: Despite presenting with classic angina-like symptoms, the unrelenting nature of his pain and lack of response to nitroglycerin suggest a non-cardiac cause. Further imaging might reveal a metastatic bone lesion as the true source of his chest pain, especially if there is an underlying malignancy not yet diagnosed."
},

{
scenario:"A 67 year old woman with advanced liver cirrhosis presents to the clinic with altered mental status, jaundice, and abdominal swelling. Her caregiver mentions that she has been increasingly confused over the past two days.
",
diagnosis:"Hepatic Encephalopathy: The patient's advanced liver cirrhosis and altered mental status strongly suggest hepatic encephalopathy. This condition is common in patients with liver cirrhosis due to the accumulation of toxins like ammonia that the liver can no longer effectively clear.
"
},

{
scenario:"A 32 year old woman comes to the emergency department with severe muscle weakness, ptosis, and difficulty swallowing. She has experienced similar but milder episodes in the past, which resolved spontaneously.
",
diagnosis:"Bell's Palsy: Although her symptoms may initially suggest a more generalized neuromuscular disorder, the primarily facial involvement (ptosis, facial weakness) and the history of spontaneous resolution are more consistent with Bell’s Palsy. Bell’s Palsy typically presents with acute unilateral facial nerve (CN VII) palsy that can affect eyelid closure and swallowing, often improving without specific intervention."
},

{
scenario:"A 3 year old girl, previously healthy, presents to the emergency department with a sudden onset of high fever, intense irritability, and a purplish rash spreading rapidly across her legs and abdomen. Her parents report that she had been complaining of joint pain and had a mild cough a few days prior to the onset of the rash. Despite initial treatment with antipyretics, her condition has rapidly deteriorated, with symptoms of lethargy and decreased responsiveness on the way to the hospital.
",
diagnosis:"Meningococcemia: The sudden onset of high fever, purplish rash, and rapid deterioration with lethargy and decreased responsiveness are classic signs of meningococcemia. The presence of a purpuric rash and irritability further supports this diagnosis.
"
},

{
scenario:"A 29-year-old male presents to the emergency department with sudden onset of right-sided chest pain and shortness of breath following a minor car accident where he was the front-seat passenger. He describes the pain as sharp and worsening with deep breaths. On examination, he appears anxious, his respiratory rate is elevated, and oxygen saturation is slightly below normal on room air. His past medical history is unremarkable, and he takes no medications.
",
diagnosis:"Asthma: The patient’s anxiety, elevated respiratory rate, and mild hypoxemia in a previously healthy individual are consistent with a bronchospastic event rather than direct injury from the accident."
},
];

let currentIndex = 0;          // track which scenario
let experimentData = [];       // store data for each scenario


/************************************************************
  3) HELPER FUNCTIONS
************************************************************/
/**
 * Save any data object to localStorage as JSON.
 */
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Load data from localStorage by key (JSON parse).
 */
function loadFromLocalStorage(key) {
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : null;
}

/**
 * Typing effect for the diagnosis text.
 * We'll store the interval so we can clear it if user moves on quickly.
 */
function typeText(element, text, speed = 50) {
  element.textContent = "";
  let idx = 0;
  const timer = setInterval(() => {
    element.textContent += text.charAt(idx);
    idx++;
    if (idx >= text.length) {
      clearInterval(timer);
    }
  }, speed);
  return timer; // so we can clear it externally if needed
}

/**
 * Returns the checked value of a group of radio buttons by name.
 */
function getRadioValue(name) {
  const radios = document.getElementsByName(name);
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  return "";
}

/**
 * Send final data to Back4App in a "StudyResults" class.
 */
async function sendDataToBack4App(preSurveyData, experimentData, postSurveyData, irbConsent) {
  try {
    const StudyResults = Parse.Object.extend("StudyResults");
    const studyObj = new StudyResults();

    studyObj.set("preSurveyData", preSurveyData);
    studyObj.set("experimentData", experimentData);
    studyObj.set("postSurveyData", postSurveyData);
    if (irbConsent) {
      studyObj.set("irbConsent", irbConsent);
    }

    const savedObj = await studyObj.save();
    console.log("Data saved to Back4App! ObjectID:", savedObj.id);

    alert("Your data has been successfully sent to Back4App!");
  } catch (error) {
    console.error("Error saving data to Back4App:", error);
    alert("Error: Could not save data to Back4App.");
  }
}


/************************************************************
  4) IRB CONSENT PAGE
************************************************************/
/**
 * A page named "irb.html" with #irbForm, #consentCheck, 
 * so user must check "I ACCEPT" to proceed to pre-survey.
 */
function handleIRBPage() {
  const irbForm = document.getElementById("irbForm");
  if (!irbForm) return; // not on IRB page

  irbForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const consentCheck = document.getElementById("consentCheck");
    if (!consentCheck.checked) {
      alert("Please check 'I ACCEPT' to proceed.");
      return;
    }
    // If checked => store acceptance
    localStorage.setItem("irbConsent", "accepted");

    // proceed to pre-survey
    window.location.href = "pre-survey.html";
  });
}


/************************************************************
  5) PRE-SURVEY PAGE
************************************************************/
/**
 * Gathers new question list (including email, gender, etc.),
 * saves to localStorage["preSurveyData"], 
 * and clears old experiment/post data, then goes to experiment page.
 */
function handlePreSurveyPage() {
  const form = document.getElementById("preSurveyForm");
  if (!form) return; // not on pre-survey page

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // 1. email
    const email = document.getElementById("email").value.trim();

    // 2. gender (radio group)
    let gender = "";
    const genderRadios = document.getElementsByName("gender");
    for (let i = 0; i < genderRadios.length; i++) {
      if (genderRadios[i].checked) {
        gender = genderRadios[i].value;
        break;
      }
    }

    // 3. ageGroup (select)
    const ageGroup = document.getElementById("ageGroup").value;

    // 4. clinicalPracticeYears
    const clinicalPracticeYears = document.getElementById("clinicalPracticeYears").value;

    // 5. ethnicity + "Other"
    const ethnicitySel = document.getElementById("ethnicity");
    const ethnicityOtherVal = document.getElementById("ethnicityOther").value.trim();
    let ethnicity = ethnicitySel.value;
    if (ethnicity === "Other" && ethnicityOtherVal) {
      ethnicity = "Other: " + ethnicityOtherVal;
    }

    // 6. clinicalExpertise
    const clinicalExpertise = document.getElementById("clinicalExpertise").value;

    // 7. professionalTitle
    const professionalTitle = document.getElementById("professionalTitle").value;

    // 8. practiceSetting + "Other"
    const practiceSettingSel = document.getElementById("practiceSetting");
    const practiceSettingOtherVal = document.getElementById("practiceSettingOther").value.trim();
    let practiceSetting = practiceSettingSel.value;
    if (practiceSetting === "Other" && practiceSettingOtherVal) {
      practiceSetting = "Other: " + practiceSettingOtherVal;
    }

    // 9. clinicalSpecialty + "Other"
    const clinicalSpecialtySel = document.getElementById("clinicalSpecialty");
    const clinicalSpecialtyOtherVal = document.getElementById("clinicalSpecialtyOther").value.trim();
    let clinicalSpecialty = clinicalSpecialtySel.value;
    if (clinicalSpecialty === "Other" && clinicalSpecialtyOtherVal) {
      clinicalSpecialty = "Other: " + clinicalSpecialtyOtherVal;
    }

    // 10. aiUsage
    const aiUsage = document.getElementById("aiUsage").value;

    // 11. aiFamiliar
    const aiFamiliar = document.getElementById("aiFamiliar").value;

    // 12. aiTrust
    const aiTrust = document.getElementById("aiTrust").value;

    // 13. aiWilling
    const aiWilling = document.getElementById("aiWilling").value;

    // Build preSurveyData object
    const preSurveyData = {
      email,
      gender,
      ageGroup,
      clinicalPracticeYears,
      ethnicity,
      clinicalExpertise,
      professionalTitle,
      practiceSetting,
      clinicalSpecialty,
      aiUsage,
      aiFamiliar,
      aiTrust,
      aiWilling
    };

    saveToLocalStorage("preSurveyData", preSurveyData);

    // Clear old experiment/post data
    localStorage.removeItem("experimentData");
    localStorage.removeItem("postSurveyData");

    // Next => experiment
    window.location.href = "experiment.html";
  });
}


/************************************************************
  6) EXPERIMENT PAGE
************************************************************/
/**
 * We have #caseCounter (the big text for "Case Number"),
 * #scenarioText, #diagnosisText, #trustButton, #notTrustButton,
 * #extraQuestionsForm (for the 4 AI Qs).
 * Also handle leftover typing if user clicks Next quickly.
 */
function handleExperimentPage() {
  const experimentSection = document.getElementById("experimentSection");
  if (!experimentSection) return; // not on experiment page

  const scenarioText = document.getElementById("scenarioText");
  const diagnosisText = document.getElementById("diagnosisText");
  const trustButton = document.getElementById("trustButton");
  const notTrustButton = document.getElementById("notTrustButton");
  const extraQuestionsForm = document.getElementById("extraQuestionsForm");
  const caseCounterEl = document.getElementById("caseCounter"); // new big text

  let typingTimer = null; // store interval for typed text

  // If partial data from localStorage, resume
  const storedExpData = loadFromLocalStorage("experimentData");
  if (storedExpData) {
    experimentData = storedExpData;
    currentIndex = experimentData.length;
  }

  // Decide how to label the case number
  function getCaseLabel(index) {
    // Example: first 2 => "Practice 1" / "Practice 2"
    // the rest => X out of (total-2)
    const total = experimentCases.length; // e.g. 17
    if (index === 0) return "Practice 1";
    if (index === 1) return "Practice 2";
    // rest => "1 out of total-2"
    const realIndex = index - 2 + 1;
    const totalReal = total - 2;
    return `${realIndex} out of ${totalReal}`;
  }

  function displayCase(index) {
    if (index >= experimentCases.length) {
      window.location.href = "post-survey.html";
      return;
    }

    // Clear leftover typing if any
    if (typingTimer) {
      clearInterval(typingTimer);
      typingTimer = null;
    }

    // Hide the 4 Q form until user picks trust or not-trust
    extraQuestionsForm.style.display = "none";
    extraQuestionsForm.reset();

    // Update "Case Number"
    if (caseCounterEl) {
      caseCounterEl.textContent = "Case Number: " + getCaseLabel(index);
    }

    // Show the scenario
    scenarioText.textContent = experimentCases[index].scenario;

    // Type the diagnosis
    diagnosisText.textContent = "";
    const diagFull = "The diagnosis for this scenario is: " + experimentCases[index].diagnosis;
    let idx = 0;
    typingTimer = setInterval(() => {
      if (idx < diagFull.length) {
        diagnosisText.textContent += diagFull.charAt(idx);
        idx++;
      } else {
        clearInterval(typingTimer);
      }
    }, 40);
  }

  displayCase(currentIndex);

  let currentDecision = null;
  let currentReason = null;

  trustButton.addEventListener("click", () => {
    currentDecision = "trust";
    currentReason = null;
    extraQuestionsForm.style.display = "block";
  });

  notTrustButton.addEventListener("click", () => {
    currentDecision = "notTrust";
    const reason = prompt("Please enter your reason for not trusting:") || "";
    currentReason = reason;
    extraQuestionsForm.style.display = "block";
  });

  extraQuestionsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!currentDecision) {
      alert("Please pick Trust or Not Trust first!");
      return;
    }
    const accuracy = getRadioValue("accuracy");
    const risk = getRadioValue("risk");
    const comfortable = getRadioValue("comfortable");
    const trust = getRadioValue("trust");

    experimentData.push({
      scenario: experimentCases[currentIndex].scenario,
      diagnosis: experimentCases[currentIndex].diagnosis,
      decision: currentDecision,
      reason: currentReason,
      accuracy,
      risk,
      comfortable,
      trust
    });

    saveToLocalStorage("experimentData", experimentData);

    // next scenario
    currentIndex++;
    currentDecision = null;
    currentReason = null;
    displayCase(currentIndex);
  });
}


/************************************************************
  7) POST-SURVEY PAGE
************************************************************/
/**
 * On "post-survey.html", gather final Qs, show "Thank you," then
 * combine everything => send to Back4App.
 * Also includes IRB acceptance (if user accepted).
 */
function handlePostSurveyPage() {
  const postSurveyForm = document.getElementById("postSurveyForm");
  const thankYouMessage = document.getElementById("thankYouMessage");
  if (!postSurveyForm) return;

  postSurveyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Suppose you have 16 radio Qs. Example for Q1..Q2 => q1, q2, etc.
    const postSurveyData = {
      q1: getRadioValue("q1"),
      q2: getRadioValue("q2")
      // ...
      // q16: getRadioValue("q16")
    };

    saveToLocalStorage("postSurveyData", postSurveyData);

    // Hide the form, show "Thank you"
    postSurveyForm.style.display = "none";
    thankYouMessage.style.display = "block";

    // Gather everything
    const preSurveyData = loadFromLocalStorage("preSurveyData") || {};
    const experimentResults = loadFromLocalStorage("experimentData") || [];
    const irbConsent = localStorage.getItem("irbConsent") || "not accepted";

    // Send to Back4App
    await sendDataToBack4App(preSurveyData, experimentResults, postSurveyData, irbConsent);
  });
}


/************************************************************
  8) INIT ON DOMContentLoaded
************************************************************/
document.addEventListener("DOMContentLoaded", () => {
  // IRB page (irb.html) => "I ACCEPT" => store localStorage, go to pre-survey
  handleIRBPage();

  // Pre-Survey page => store user data in "preSurveyData"
  handlePreSurveyPage();

  // Experiment page => typed diagnosis, trust/not trust, store scenario results
  handleExperimentPage();

  // Post-Survey page => final Qs => send all data to Back4App
  handlePostSurveyPage();

  // Show/hide "Other" text fields in pre-survey
  const ethnicitySel = document.getElementById("ethnicity");
  const ethnicityOther = document.getElementById("ethnicityOther");
  if (ethnicitySel && ethnicityOther) {
    ethnicitySel.addEventListener("change", () => {
      ethnicityOther.style.display = (ethnicitySel.value === "Other") ? "inline-block" : "none";
    });
  }

  const practiceSettingSel = document.getElementById("practiceSetting");
  const practiceSettingOther = document.getElementById("practiceSettingOther");
  if (practiceSettingSel && practiceSettingOther) {
    practiceSettingSel.addEventListener("change", () => {
      practiceSettingOther.style.display = (practiceSettingSel.value === "Other") ? "inline-block" : "none";
    });
  }

  const clinicalSpecialtySel = document.getElementById("clinicalSpecialty");
  const clinicalSpecialtyOther = document.getElementById("clinicalSpecialtyOther");
  if (clinicalSpecialtySel && clinicalSpecialtyOther) {
    clinicalSpecialtySel.addEventListener("change", () => {
      clinicalSpecialtyOther.style.display = (clinicalSpecialtySel.value === "Other") ? "inline-block" : "none";
    });
  }
});
