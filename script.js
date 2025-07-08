// Simulated in-memory storage
const users = {};

function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (users[username]) {
    alert("Username already exists. Please login.");
  } else {
    users[username] = password;
    alert("Registered successfully! You can now login.");
  }
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (users[username] && users[username] === password) {
    alert("Login successful!");
    document.getElementById("auth-container").style.display = "none";
    document.getElementById("form-container").style.display = "block";
  } else {
    alert("Invalid credentials. Please register first.");
  }
}

function toggleCutoff() {
  const choice = document.getElementById("engineeringChoice").value;
  document.getElementById("cutoffSection").style.display = choice === "yes" ? "block" : "none";
}

document.getElementById("detailsForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const place = document.getElementById("place").value;
  const group = document.getElementById("group").value;
  const marks11 = parseFloat(document.getElementById("marks11").value);
  const marks12 = parseFloat(document.getElementById("marks12").value);
  const income = document.getElementById("income").value;
  const engineeringChoice = document.getElementById("engineeringChoice").value;
  const cutoff = parseFloat(document.getElementById("cutoff").value);

  const careerOptions = {
    biology: {
      low: ["ANM Nurse", "Govt Health Assistant", "Paramedical Technician"],
      middle: ["Nursing Officer", "Pharmacist", "BSc Nursing"]
    },
    "computer science": {
      low: ["IT Technician", "Data Entry Operator", "Computer Lab Assistant"],
      middle: ["BCA Student", "Software Tester", "Web Developer"]
    },
    commerce: {
      low: ["Clerk Apprentice", "Retail Assistant", "Bank Field Officer"],
      middle: ["B.Com + CA/CS", "Financial Analyst", "Auditing Assistant"]
    },
    vocational: {
      low: ["ITI Electrician", "Field Service Technician", "Farm Equipment Mechanic"],
      middle: ["Diploma in Mechanical", "Supervisor", "Quality Inspector"]
    }
  };

  const engineeringColleges = [
    { name: "Anna University, CEG", minCutoff: 195 },
    { name: "PSG College of Technology", minCutoff: 192 },
    { name: "Kumaraguru College of Technology", minCutoff: 185 },
    { name: "GCE Salem", minCutoff: 180 },
    { name: "Tier-2 Private Colleges", minCutoff: 150 }
  ];

  let message = `<h3>Thank you!</h3>
    <p><strong>Location:</strong> ${place}</p>
    <p><strong>Group:</strong> ${group}</p>
    <p><strong>11th Marks:</strong> ${marks11}%</p>
    <p><strong>12th Marks:</strong> ${marks12}%</p>
    <p><strong>Income Level:</strong> ${income}</p>`;

  if (careerOptions[group] && careerOptions[group][income]) {
    message += `<h4>Career Suggestions:</h4><ul>`;
    careerOptions[group][income].forEach(career => {
      message += `<li>${career}</li>`;
    });
    message += `</ul>`;
  }

  if (engineeringChoice === "yes" && !isNaN(cutoff)) {
    message += `<h4>Engineering College Suggestions:</h4><ul>`;
    const eligible = engineeringColleges.filter(college => cutoff >= college.minCutoff);
    if (eligible.length > 0) {
      eligible.forEach(college => {
        message += `<li>${college.name} (Min Cutoff: ${college.minCutoff})</li>`;
      });
    } else {
      message += `<li>No major colleges match your cutoff.</li>`;
    }
    message += `</ul>`;
  }

  document.getElementById("output").innerHTML = message;
  document.getElementById("output").style.display = "block";
});

// 🎤 Ask Mentor Query Handler
function askMentor() {
  const query = document.getElementById("queryInput").value.toLowerCase();
  const replyBox = document.getElementById("mentorReply");

  let response = "Thank you for your question! A mentor will reach out soon.";

  if (query.includes("diploma")) {
    response = "You can try Diploma in Mechanical, ECE, or Computer Engineering in nearby polytechnic colleges.";
  } else if (query.includes("low marks")) {
    response = "Even with low marks, you can go for ITI, NSDC skill programs, or apprenticeships in local industries.";
  } else if (query.includes("career") || query.includes("job")) {
    response = "Choose based on your interests. Try careers in AgriTech, Nursing, Teaching, or Software Support.";
  }

  replyBox.innerHTML = `<strong>Mentor:</strong> ${response}`;
  replyBox.style.display = "block";
}

// 🎤 Voice Recognition
function startVoice() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-IN';
  recognition.start();

  recognition.onresult = function(event) {
    const voiceText = event.results[0][0].transcript;
    document.getElementById("queryInput").value = voiceText;
    askMentor(); // Auto send
  };

  recognition.onerror = function(event) {
    alert("Voice input error: " + event.error);
  };
}
