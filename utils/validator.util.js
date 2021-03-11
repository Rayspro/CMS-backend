function emailCheck(email) {
  return new Promise((resolve, reject) => {
    if (email.length < 2) {
      reject("Email not valid");
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
      resolve(true);
    } else {
      reject("Email is not valid");
    }
  });
}

function passwordCheck(password) {
  return new Promise((resolve, reject) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (regex.test(password)) {
      resolve(true);
    } else {
      reject("Invalid Password");
    }
  });
}

module.exports = { passwordCheck, emailCheck };
