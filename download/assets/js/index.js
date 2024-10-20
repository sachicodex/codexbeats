const firebaseConfig = {
  apiKey: "AIzaSyCdoZtzprdSmidOEDY2W4XttUc1cu8M_pk",
  authDomain: "login-with-firebase-data-5088d.firebaseapp.com",
  projectId: "login-with-firebase-data-5088d",
  storageBucket: "login-with-firebase-data-5088d.appspot.com",
  messagingSenderId: "1002800694814",
  appId: "1:1002800694814:web:dcace0d82fd4c61c4c500f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Set up our register function
function register() {
  // Get all our input fields
  full_name = document.getElementById("full_name").value;
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  // Function to clear input fields
  function clearInputFields() {
    document.getElementById("full_name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  }

  if (validate_field(full_name) == false) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter your name!",
    });
    return;
  }

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Input Email and Password!",
    });
    return;
  }

  // Move on with Auth
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        email: email,
        full_name: full_name,
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).set(user_data);

      // Show success message and reset input fields
      Swal.fire({
        icon: "success",
        title: "Success! Login Now.",
        showConfirmButton: true,
      }).then(() => {
        document.getElementById("button_login").style.display = "block";
        document.getElementById("button_signup").style.display = "none";
        document.getElementById("form_header").innerHTML = "Login your account";
        clearInputFields();
      });
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_message = error.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error_message,
      });
    });
}

// Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please Enter Your Details!",
    });
    return;
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).update(user_data);

      // Show success message and trigger the image download
      Swal.fire({
        icon: "success",
        title: "You Are Successfully Logged In!",
        showConfirmButton: false,
        timer: 2500,
      }).then(() => {
        // Fetch the image file and trigger download
        const imageUrl =
          "https://raw.githubusercontent.com/sachicodex/codexbeats/main/download/assets/apk/Code%20x%20Beats.apk";

        // Use fetch API to get the image and convert it to a blob
        fetch(imageUrl)
          .then((response) => response.blob())
          .then((blob) => {
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "Code x Beats v 8.2.0.apk"; // Set the file name for download
            link.click(); // Trigger the download
          })
          .catch((error) =>
            console.error("Error downloading the image:", error)
          );
      });
    })
    .catch(function (error) {
      var error_message = error.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email or Password Is Wrong!",
      });
    });
}

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    return true; // Email is good
  } else {
    return false; // Email is not good
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null || field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

// Function to clear input fields
function clearInputFields() {
  setTimeout(() => {
    document.getElementById("full_name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  }, 600);
}

function handleLogin() {
  const contentContainer = document.getElementById("content_container");

  // Apply fade-scale-out (zoom out)
  contentContainer.classList.add("fade-scale-out");

  contentContainer.addEventListener(
    "animationend",
    function () {
      document.getElementById("button_signup").style.display = "none";
      document.getElementById("button_login").style.display = "block";
      document.getElementById("form_header").innerHTML = "Hi, welcome back!";
      document.getElementById("header_paragraph").innerHTML =
        "Now login <span> with your account</span>";
      clearInputFields();

      // Remove fade-scale-out and apply fade-scale-in (zoom in)
      contentContainer.classList.remove("fade-scale-out");
      contentContainer.classList.add("fade-scale-in");
    },
    { once: true }
  );

  contentContainer.addEventListener(
    "animationend",
    function () {
      contentContainer.classList.remove("fade-scale-in");
    },
    { once: true }
  );
}

function showSignupForm() {
  const contentContainer = document.getElementById("content_container");

  // Apply fade-scale-out (zoom out)
  contentContainer.classList.add("fade-scale-out");

  contentContainer.addEventListener(
    "animationend",
    function () {
      document.getElementById("button_login").style.display = "none";
      document.getElementById("button_signup").style.display = "block";
      document.getElementById("form_header").innerHTML = "Hi, welcome user!";
      document.getElementById("header_paragraph").innerHTML =
        "<span>First time here?</span> Sign up for free";
      clearInputFields();

      // Remove fade-scale-out and apply fade-scale-in (zoom in)
      contentContainer.classList.remove("fade-scale-out");
      contentContainer.classList.add("fade-scale-in");
    },
    { once: true }
  );

  contentContainer.addEventListener(
    "animationend",
    function () {
      contentContainer.classList.remove("fade-scale-in");
    },
    { once: true }
  );
}

// Select the password input field and the toggle icon (eye icon)
let togglePassword = document.querySelector("#togglePassword");
let passwordField = document.querySelector("#password");

togglePassword.addEventListener("click", function () {
  const type =
    passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);

  const icon = this.querySelector("i");
  icon.classList.toggle("fa-eye-slash");
});

// Loader
document.body.style.scrollBehavior = "smooth";

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.querySelector(".parent").style.opacity = "0";
    document.querySelector(".parent").style.transition =
      "opacity 1s ease-in-out";
    document.querySelector(".main-content").classList.add("visible");

    setTimeout(function () {
      document.querySelector(".parent").style.display = "none";
      document.body.style.overflow = "auto";
    }, 1000); // Matches the transition duration
  }, 4000);
});
