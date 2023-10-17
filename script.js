
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
                    openEditModal(index);
                });

                var deleteButton = document.createElement("span");
                deleteButton.className = "delete-btn";
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", function() {
                    openDeleteModal(index);
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

        // Function to open the edit modal
        function openEditModal(index) {
            var user = users[index];
            var editName = document.getElementById("editName");
            var editAge = document.getElementById("editAge");
            var editCity = document.getElementById("editCity");

            editName.value = user.name;
            editAge.value = user.age;
            editCity.value = user.city;

            var editModal = document.getElementById("editModal");
            editModal.style.display = "block";

            // Handle the edit submission
            var editForm = document.getElementById("editForm");
            editForm.onsubmit = function(event) {
                event.preventDefault();
                user.name = editName.value;
                user.age = editAge.value;
                user.city = editCity.value;
                displayUsers();
                editModal.style.display = "none";
                saveUsersToLocalStorage();
            };

            // Handle the cancel button
            var closeEditModalBtn = document.getElementById("closeEditModalBtn");
            closeEditModalBtn.onclick = function() {
                editModal.style.display = "none";
            };
        }

        // Function to delete a user
        function openDeleteModal(index) {
            
            var deleteModal= document.getElementById("deleteModal");
            deleteModal.style.display="block"

            var confirmDeleteBtn= document.getElementById("confirmDelete");
            confirmDeleteBtn.onclick=function(){
                users.splice(index,1);
                deleteModal.style.display="none";
                
            displayUsers();
            saveUsersToLocalStorage();
            };
            var cancelDeleteBtn= document.getElementById("cancelDelete");
            cancelDeleteBtn.onclick=function(){
                deleteModal.style.display="none";
            };
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

        // Open Modal when the Create New User button is pressed
        const openModalBtn = document.getElementById("openModalBtn");
        const userModal = document.getElementById("userModal");
        const closeModalBtn = document.getElementById("closeModalBtn");

        openModalBtn.addEventListener("click", function(){
            userModal.style.display="block";
        });

        //Close Modal when "x" or background is clicked

        closeModalBtn.addEventListener("click", function(){
            userModal.style.display="none";
        });

        window.addEventListener("click", function(event){
            if(event.target == userModal){
                userModal.style.display="none"; 
            }
        });

        // Submit User Form
const userForm = document.getElementById("userForm");
userForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const Name = document.getElementById("Name").value;
    const Age = document.getElementById("Age").value;
    const City = document.getElementById("City").value;

    const newUser = { name: Name, age: Age, city: City };
    users.push(newUser);
    displayUsers();
    saveUsersToLocalStorage();

    userModal.style.display = "none"; // Close the modal
});

        // Load initial users and display them
        loadUsersFromLocalStorage();
        displayUsers();
