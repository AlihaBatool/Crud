
        // Hard-coded initial user data
        var users = [
            { name: "Momina", age: 30, city: "New York" },
            { name: "Zohra", age: 25, city: "Lahore" },
            { name: "Ahsan", age: 35, city: "Karachi" }
        ];

        // Function to display users in the table
        function displayUsers() {
            var tbody = document.getElementById("userTableBody");
            tbody.innerHTML = "";

            users.forEach(function(user, index) {
                var row = document.createElement("tr");
                var nameCell = document.createElement("td");
                var ageCell = document.createElement("td");
                var cityCell = document.createElement("td");
                var actionCell = document.createElement("td");

                nameCell.textContent = user.name;
                ageCell.textContent = user.age;
                cityCell.textContent = user.city;

                var editButton = document.createElement("span");
                editButton.className = "edit-btn";
                editButton.textContent = "Edit";
                editButton.addEventListener("click", function() {
                    openEditPopup(index);
                });

                var deleteButton = document.createElement("span");
                deleteButton.className = "delete-btn";
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", function() {
                    deleteUser(index);
                });

                actionCell.appendChild(editButton);
                actionCell.appendChild(deleteButton);

                row.appendChild(nameCell);
                row.appendChild(ageCell);
                row.appendChild(cityCell);
                row.appendChild(actionCell);

                tbody.appendChild(row);
            });
        }

        // Function to open the edit popup
        function openEditPopup(index) {
            var user = users[index];
            var editName = document.getElementById("editName");
            var editAge = document.getElementById("editAge");
            var editCity = document.getElementById("editCity");

            editName.value = user.name;
            editAge.value = user.age;
            editCity.value = user.city;

            var editPopup = document.getElementById("editPopup");
            editPopup.style.display = "block";

            // Handle the edit submission
            var editSubmit = document.getElementById("editSubmit");
            editSubmit.onclick = function() {
                user.name = editName.value;
                user.age = editAge.value;
                user.city = editCity.value;
                displayUsers();
                editPopup.style.display = "none";
                saveUsersToLocalStorage();
            };

            // Handle the cancel button
            var editCancel = document.getElementById("editCancel");
            editCancel.onclick = function() {
                editPopup.style.display = "none";
            };
        }

        // Function to delete a user
        function deleteUser(index) {
            if(confirm('Are you sure you want to delete this record')){
            users.splice(index, 1);
            displayUsers();
            saveUsersToLocalStorage();
        }
    }

        // Function to save users to local storage
        function saveUsersToLocalStorage() {
            localStorage.setItem("users", JSON.stringify(users));
        }

        // Function to load users from local storage
        function loadUsersFromLocalStorage() {
            var savedUsers = localStorage.getItem("users");
            if (savedUsers) {
                users = JSON.parse(savedUsers);
                displayUsers();
            }
        }

        // Add a new user
        var addUserBtn = document.getElementById("addUserBtn");
        addUserBtn.onclick = function() {
            var newName = prompt("Enter name:");
            var newAge = prompt("Enter age:");
            var newCity = prompt("Enter city:");

            if (newName && newAge && newCity) {
                var newUser = {
                    name: newName,
                    age: parseInt(newAge),
                    city: newCity
                };

                users.push(newUser);
                displayUsers();
                saveUsersToLocalStorage();
            }
        };

        // Load initial users and display them
        loadUsersFromLocalStorage();
        displayUsers();
