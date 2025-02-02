/************************************************************
  1) PARSE / BACK4APP INIT
  - Make sure you included: <script src="https://unpkg.com/parse/dist/parse.min.js"></script>
    in your HTML pages.
************************************************************/
Parse.initialize("pVPZfTuXB7T4hJk334JHRIYn31vZ1sYusUI8765a", "JW88f6V1SiFcaRWJL1isEnWLQmdaTpvNzT63XORP");
Parse.serverURL = "https://parseapi.back4app.com/";



/************************************************************
  2) EXPERIMENT CASES (Scenario + Diagnosis)
    - Edit or expand these 20 items as desired.
************************************************************/
const experimentCases = [
  { 
scenario: "Patient Case 1: A 65-year-old woman with a history of diabetes and hyperlipidemia presents with acute-onset chest pain and diaphoresis, with ECG findings of hyperacute T-waves without ST elevation. ",
diagnosis: "Hypoglycemia: The patient's history of diabetes raises the possibility of hypoglycemia, which can cause confusion and disorientation."
},
{
scenario:" Patient Case 2: 65-year-old male with PMH of hypertension, diabetes, and a history of strokes presenting with confusion and disorientation after a fall.",
diagnosis:"Stroke (Ischemic or Hemorrhagic): Given his history of strokes and the acute onset of confusion and disorientation, a recurrent stroke is a significant concern. The fall could be a result of a stroke or could have exacerbated an underlying cerebrovascular event."
},
  {
    scenario: "Text 3: Another scenario example...",
    diagnosis: "The AI suggests risk of early diabetes."
  },
  // ...
  {
    scenario: "Text 20: The final scenario",
    diagnosis: "The AI suggests possible sepsis."
  }
];

// Track which scenario we’re on:
let currentIndex = 0;

// Store each trial’s data (trust/not trust, reason, 4 Q answers):
let experimentData = [];


/************************************************************
  3) HELPER FUNCTIONS
************************************************************/

/** Save data to localStorage to preserve partial progress. */
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/** Load data from localStorage. */
function loadFromLocalStorage(key) {
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : null;
}

/**
 * Typing effect for the diagnosis text (speech bubble).
 * element: The DOM element to type into
 * text: The string to type
 * speed: ms delay per character (default ~50ms)
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
}

/**
 * Saves the full study results to Back4App after Post-Survey.
 * Gathers:
 *  - preSurveyData
 *  - experimentData
 *  - postSurveyData
 * Then creates a new object in the "StudyResults" class.
 */
async function saveStudyResultsToBack4App() {
  try {
    // Load local data
    const preSurveyData = loadFromLocalStorage("preSurveyData") || {};
    const experimentResults = loadFromLocalStorage("experimentData") || [];
    const postSurveyData = loadFromLocalStorage("postSurveyData") || {};

    // Create or extend the "StudyResults" class in Parse
    const StudyResults = Parse.Object.extend("StudyResults");
    const studyObj = new StudyResults();

    // Store them as JSON fields
    studyObj.set("preSurveyData", preSurveyData);
    studyObj.set("experimentData", experimentResults);
    studyObj.set("postSurveyData", postSurveyData);

    // Save to server
    const savedObj = await studyObj.save();
    console.log("Data saved to Back4App. ObjectID:", savedObj.id);
    alert("Your data has been successfully saved to Back4App!");
  } catch (error) {
    console.error("Error saving data to Back4App:", error);
    alert("Error: Failed to save data to Back4App.");
  }
}


/************************************************************
  4) PAGE-SPECIFIC HANDLERS
     (Pre-Survey, Experiment, Post-Survey)
************************************************************/

/** PRE-SURVEY PAGE **/
function handlePreSurveyPage() {
  const form = document.getElementById("preSurveyForm");
  if (!form) return; // Not on pre-survey page

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic info: Name & Email
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    // Gender (radio)
    let gender = "";
    const genderRadios = document.getElementsByName("gender");
    for (let i = 0; i < genderRadios.length; i++) {
      if (genderRadios[i].checked) {
        gender = genderRadios[i].value;
        break;
      }
    }

    const ageGroup = document.getElementById("ageGroup").value;
    const clinicalPracticeYears = document.getElementById("clinicalPracticeYears").value;

    // Ethnicity + "Other"
    const ethnicitySelect = document.getElementById("ethnicity");
    const ethnicityOtherVal = document.getElementById("ethnicityOther").value.trim();
    let ethnicity = ethnicitySelect.value;
    if (ethnicity === "Other" && ethnicityOtherVal) {
      ethnicity = `Other: ${ethnicityOtherVal}`;
    }

    const clinicalExpertise = document.getElementById("clinicalExpertise").value;
    const professionalTitle = document.getElementById("professionalTitle").value;

    // Practice Setting + "Other"
    const practiceSettingSelect = document.getElementById("practiceSetting");
    const practiceSettingOtherVal = document.getElementById("practiceSettingOther").value.trim();
    let practiceSetting = practiceSettingSelect.value;
    if (practiceSetting === "Other" && practiceSettingOtherVal) {
      practiceSetting = `Other: ${practiceSettingOtherVal}`;
    }

    // Specialty + "Other"
    const clinicalSpecialtySelect = document.getElementById("clinicalSpecialty");
    const clinicalSpecialtyOtherVal = document.getElementById("clinicalSpecialtyOther").value.trim();
    let clinicalSpecialty = clinicalSpecialtySelect.value;
    if (clinicalSpecialty === "Other" && clinicalSpecialtyOtherVal) {
      clinicalSpecialty = `Other: ${clinicalSpecialtyOtherVal}`;
    }

    // AI usage/familiarity/trust
    const aiUsage = document.getElementById("aiUsage").value;
    const aiFamiliar = document.getElementById("aiFamiliar").value;
    const aiTrust = document.getElementById("aiTrust").value;
    const aiWilling = document.getElementById("aiWilling").value;

    // Build object
    const preSurveyData = {
      name,
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

    // Store in localStorage
    saveToLocalStorage("preSurveyData", preSurveyData);

    // Clear old data from experiment or post-survey
    localStorage.removeItem("experimentData");
    localStorage.removeItem("postSurveyData");

    // Go to experiment
    window.location.href = "experiment.html";
  });
}


/** EXPERIMENT PAGE **/
function handleExperimentPage() {
  const experimentSection = document.getElementById("experimentSection");
  if (!experimentSection) return; // Not on experiment page

  const scenarioText = document.getElementById("scenarioText");
  const diagnosisText = document.getElementById("diagnosisText");
  const trustButton = document.getElementById("trustButton");
  const notTrustButton = document.getElementById("notTrustButton");
  const extraQuestionsForm = document.getElementById("extraQuestionsForm");

  // If user partially completed earlier:
  const stored = loadFromLocalStorage("experimentData");
  if (stored) {
    experimentData = stored;
    currentIndex = experimentData.length;
  }

  function displayCase(index) {
    if (index >= experimentCases.length) {
      // All 20 done
      window.location.href = "post-survey.html";
      return;
    }
    // Reset form for the new scenario
    extraQuestionsForm.style.display = "none";
    extraQuestionsForm.reset();

    // Show scenario
    scenarioText.textContent = experimentCases[index].scenario;
    // Type the diagnosis in a speech bubble
    const diagFull = "The diagnosis for this scenario is: " + experimentCases[index].diagnosis;
    typeText(diagnosisText, diagFull, 40); // 40ms per character
  }

  // Start with the current scenario
  displayCase(currentIndex);

  let currentDecision = null;
  let currentReason = null;

  // "Trust" button
  trustButton.addEventListener("click", () => {
    currentDecision = "trust";
    currentReason = null;
    extraQuestionsForm.style.display = "block";
  });

  // "Not Trust" button
  notTrustButton.addEventListener("click", () => {
    currentDecision = "notTrust";
    const reason = prompt("Please enter your reason for not trusting:") || "";
    currentReason = reason;
    extraQuestionsForm.style.display = "block";
  });

  // Submit the 4 radio questions
  extraQuestionsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!currentDecision) {
      alert("Please pick Trust or Not Trust first!");
      return;
    }

    // Read the 4 radio answers
    const accuracy = getRadioValue("accuracy");
    const risk = getRadioValue("risk");
    const comfortable = getRadioValue("comfortable");
    const trust = getRadioValue("trust");

    // Record this scenario’s data
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

    // Move on
    currentIndex++;
    currentDecision = null;
    currentReason = null;
    displayCase(currentIndex);
  });

  function getRadioValue(name) {
    const radios = document.getElementsByName(name);
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) return radios[i].value;
    }
    return "";
  }
}


/** POST-SURVEY PAGE **/
function handlePostSurveyPage() {
  const postSurveyForm = document.getElementById("postSurveyForm");
  const thankYouMessage = document.getElementById("thankYouMessage");
  if (!postSurveyForm) return; // Not on post-survey page

  postSurveyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 16 new radio questions
    const postSurveyData = {
      q1:  getRadioValue("q1"),
      q2:  getRadioValue("q2"),
      q3:  getRadioValue("q3"),
      q4:  getRadioValue("q4"),
      q5:  getRadioValue("q5"),
      q6:  getRadioValue("q6"),
      q7:  getRadioValue("q7"),
      q8:  getRadioValue("q8"),
      q9:  getRadioValue("q9"),
      q10: getRadioValue("q10"),
      q11: getRadioValue("q11"),
      q12: getRadioValue("q12"),
      q13: getRadioValue("q13"),
      q14: getRadioValue("q14"),
      q15: getRadioValue("q15"),
      q16: getRadioValue("q16")
    };

    saveToLocalStorage("postSurveyData", postSurveyData);

    postSurveyForm.style.display = "none";
    thankYouMessage.style.display = "block";

    // Now save everything to Back4App
    await saveStudyResultsToBack4App();
  });

  function getRadioValue(radioName) {
    const radios = document.getElementsByName(radioName);
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        return radios[i].value;
      }
    }
    return "";
  }
}


/************************************************************
  5) INIT ON DOMContentLoaded
************************************************************/
document.addEventListener("DOMContentLoaded", () => {
  handlePreSurveyPage();
  handleExperimentPage();
  handlePostSurveyPage();

  // If you have "Other" fields in Pre-Survey for ethnicity, etc.
  // Show/hide those dynamically:
  const ethnicitySelect = document.getElementById("ethnicity");
  const ethnicityOther = document.getElementById("ethnicityOther");
  const practiceSettingSelect = document.getElementById("practiceSetting");
  const practiceSettingOther = document.getElementById("practiceSettingOther");
  const clinicalSpecialtySelect = document.getElementById("clinicalSpecialty");
  const clinicalSpecialtyOther = document.getElementById("clinicalSpecialtyOther");

  if (ethnicitySelect && ethnicityOther) {
    ethnicitySelect.addEventListener("change", () => {
      ethnicityOther.style.display = (ethnicitySelect.value === "Other") ? "block" : "none";
    });
  }
  if (practiceSettingSelect && practiceSettingOther) {
    practiceSettingSelect.addEventListener("change", () => {
      practiceSettingOther.style.display = (practiceSettingSelect.value === "Other") ? "block" : "none";
    });
  }
  if (clinicalSpecialtySelect && clinicalSpecialtyOther) {
    clinicalSpecialtySelect.addEventListener("change", () => {
      clinicalSpecialtyOther.style.display = (clinicalSpecialtySelect.value === "Other") ? "block" : "none";
    });
  }
});
