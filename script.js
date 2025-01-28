/************************************************************
  GLOBAL / SHARED VARIABLES
************************************************************/
const experimentTexts = [
  "Text 1: Some scenario here...",
  "Text 2: Another scenario...",
  "Text 3: Yet another scenario...",
  "Text 4: Scenario sample...",
  "Text 5: Scenario sample...",
  "Text 6: Scenario sample...",
  "Text 7: Scenario sample...",
  "Text 8: Scenario sample...",
  "Text 9: Scenario sample...",
  "Text 10: Scenario sample...",
  "Text 11: Scenario sample...",
  "Text 12: Scenario sample...",
  "Text 13: Scenario sample...",
  "Text 14: Scenario sample...",
  "Text 15: Scenario sample...",
  "Text 16: Scenario sample...",
  "Text 17: Scenario sample...",
  "Text 18: Scenario sample...",
  "Text 19: Scenario sample...",
  "Text 20: The final scenario"
];

let currentIndex = 0;
let experimentData = [];

/************************************************************
  HELPER FUNCTIONS
************************************************************/

/**
 * Save data to localStorage under a given key.
 * @param {string} key 
 * @param {any} data 
 */
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Load data from localStorage by key.
 * @param {string} key 
 * @returns {any|null}
 */
function loadFromLocalStorage(key) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : null;
}

/**
 * Generate a CSV string that contains:
 * - Pre-survey data (Name, Email, Age, Occupation, Experience)
 * - Experiment data (each trial's text, decision, diagnosis)
 * - Post-survey data (Satisfaction, Comments)
 * 
 * Then trigger a download of this CSV file as "<Name>.csv".
 */
function downloadDataAsCSV() {
  // Gather all data from localStorage
  const preSurveyData = loadFromLocalStorage("preSurveyData") || {};
  const experimentResults = loadFromLocalStorage("experimentData") || [];
  const postSurveyData = loadFromLocalStorage("postSurveyData") || {};

  // Build the CSV content line by line
  let csvLines = [];

  // 1) Pre-Survey Data
  csvLines.push("PRE-SURVEY DATA");
  csvLines.push("Name,Email,Age,Occupation,Experience");
  csvLines.push([
    (preSurveyData.name || "").replace(/,/g, " "),
    (preSurveyData.email || "").replace(/,/g, " "),
    preSurveyData.age || "",
    (preSurveyData.occupation || "").replace(/,/g, " "),
    preSurveyData.experience || ""
  ].join(","));
  csvLines.push(""); // blank line

  // 2) Experiment Data
  csvLines.push("EXPERIMENT DATA");
  csvLines.push("Trial,Text,Decision,Diagnosis");
  experimentResults.forEach((trial, i) => {
    const row = [
      i + 1,
      trial.text.replace(/,/g, " "),   // remove or replace commas
      trial.decision,
      trial.diagnosis ? trial.diagnosis.replace(/,/g, " ") : ""
    ].join(",");
    csvLines.push(row);
  });
  csvLines.push(""); // blank line

  // 3) Post-Survey Data
  csvLines.push("POST-SURVEY DATA");
  csvLines.push("Satisfaction,Comments");
  csvLines.push([
    postSurveyData.satisfaction || "",
    (postSurveyData.comments || "").replace(/[\r\n,]+/g, " ")
  ].join(","));
  csvLines.push(""); // blank line

  // Convert the lines to a single CSV string
  const csvString = csvLines.join("\n");

  // Decide the filename based on the participant's name
  let fileName = "experiment_data.csv";
  if (preSurveyData.name) {
    // Simple sanitization: replace spaces or non-word chars with underscores
    const safeName = preSurveyData.name.trim().replace(/\W+/g, "_");
    fileName = safeName + ".csv";
  }

  // Create a Blob and download the CSV
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/************************************************************
  PAGE-SPECIFIC HANDLERS
************************************************************/

function handlePreSurveyPage() {
  const preSurveyForm = document.getElementById("preSurveyForm");
  if (!preSurveyForm) return; // Only run if on the pre-survey page

  preSurveyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // 1) Read form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value.trim();
    const occupation = document.getElementById("occupation").value.trim();
    const experience = document.getElementById("experience").value;

    // 2) Store them in localStorage
    const preSurveyData = { name, email, age, occupation, experience };
    saveToLocalStorage("preSurveyData", preSurveyData);

    // 3) Clear any old experiment data so we start fresh
    localStorage.removeItem("experimentData");
    localStorage.removeItem("postSurveyData");

    // 4) Redirect to the experiment page
    window.location.href = "experiment.html";
  });
}


/** EXPERIMENT PAGE */
function handleExperimentPage() {
  const experimentSection = document.getElementById("experimentSection");
  if (!experimentSection) return; // Only run if on the experiment page

  const experimentText = document.getElementById("experimentText");
  const trustButton = document.getElementById("trustButton");
  const notTrustButton = document.getElementById("notTrustButton");

  // Load previously stored experimentData if user refreshes mid-journey
  const storedExperimentData = loadFromLocalStorage("experimentData");
  if (storedExperimentData) {
    experimentData = storedExperimentData;
    currentIndex = experimentData.length; // continue from where user left off
  }

  // Display the current text or go to the post-survey if done
  function displayText(index) {
    if (index >= experimentTexts.length) {
      // Done all 20 texts → move on
      window.location.href = "post-survey.html";
      return;
    }
    experimentText.textContent = experimentTexts[index];
  }

  displayText(currentIndex);

  // TRUST button
  trustButton.addEventListener("click", () => {
    experimentData.push({
      text: experimentTexts[currentIndex],
      decision: "trust",
      diagnosis: null
    });
    saveToLocalStorage("experimentData", experimentData);

    currentIndex++;
    displayText(currentIndex);
  });

  // NOT TRUST button
  notTrustButton.addEventListener("click", () => {
    const diagnosis = prompt("Please enter your reason/diagnosis for not trusting:") || "";
    experimentData.push({
      text: experimentTexts[currentIndex],
      decision: "notTrust",
      diagnosis
    });
    saveToLocalStorage("experimentData", experimentData);

    currentIndex++;
    displayText(currentIndex);
  });
}

/** POST-SURVEY PAGE */
function handlePostSurveyPage() {
  const postSurveyForm = document.getElementById("postSurveyForm");
  const thankYouMessage = document.getElementById("thankYouMessage");
  if (!postSurveyForm) return; // Only run if on the post-survey page

  postSurveyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const satisfaction = document.getElementById("satisfaction").value;
    const comments = document.getElementById("comments").value.trim();

    const postSurveyData = { satisfaction, comments };
    saveToLocalStorage("postSurveyData", postSurveyData);

    // For debugging, let's see the final data in the console
    console.log("Pre-Survey Data:", loadFromLocalStorage("preSurveyData"));
    console.log("Experiment Results:", loadFromLocalStorage("experimentData"));
    console.log("Post-Survey Data:", postSurveyData);

    // 1) Show the Thank You message
    postSurveyForm.style.display = "none";
    thankYouMessage.style.display = "block";

    // 2) Automatically download the combined data as <Name>.csv
    downloadDataAsCSV();
  });
}

/************************************************************
  INITIALIZE
************************************************************/
document.addEventListener("DOMContentLoaded", () => {
  handlePreSurveyPage();
  handleExperimentPage();
  handlePostSurveyPage();
});
