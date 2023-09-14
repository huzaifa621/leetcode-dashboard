// const fs = require("fs");

const table = document.getElementById("dashboard");

const addUserDataInRows = (data) => {
   console.log(data);
   data.forEach((element) => {
      const tr = document.createElement("tr");
      const name = document.createElement("td");
      name.innerText = element.name;
      const username = document.createElement("td");
      username.innerText = element.username;
      const easy = document.createElement("td");
      easy.innerText = element.easySolved;
      const medium = document.createElement("td");
      medium.innerText = element.mediumSolved;
      const hard = document.createElement("td");
      hard.innerText = element.hardSolved;
      tr.append(name, username, easy, medium, hard);
      table.append(tr);
   });
};

const writeDataIntoTheFile = (data) => {
   data = JSON.stringify(data);
   try {
      fs.writeFileSync("mainRequestData.json", data);
   } catch (error) {
      console.log(error);
   }
};

let usernames = [
   { username: "Sanjaykumar96", name: "Sanjay" },
   { username: "mahesh3612", name: "Mahesh" },
   { username: "suraj1234", name: "Suraj" },
   { username: "rahulajay34", name: "Rahul" },
   { username: "mayurkhachane2012", name: "Mayur" },
   { username: "Ritesh1733", name: "Ritesh" },
   { username: "user9811nu", name: "Sayan" },
];

let arrayOfFetchUserDataFromLeetCode = usernames.map(({ username, name }) => {
   let fetchUserDataFromLeetCode = new Promise((resolve, reject) => {
      fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
         .then((response) => response.json())
         .then((data) => resolve({ ...data, username, name }))
         .catch((error) => reject(error));
   });
   return fetchUserDataFromLeetCode;
});

let mainRequest = Promise.all(arrayOfFetchUserDataFromLeetCode);

mainRequest
   .then((response) => addUserDataInRows(response))
   .catch((error) => console.log(error));
