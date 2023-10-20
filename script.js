
        const baseURL = 'https://65311eb24d4c2e3f333c6a6c.mockapi.io/';
        async function retrieveData(){
            try{
                const response = await fetch(`${baseURL}/resource`);
                if (response.ok){
                    const data = await response.json();
                    return data;
                }
                else{
                    console.error('Failed to retrieve data. Status code:',response.status);
                    return[];
                }
            }
                catch(error){
                    console.error('An error occured', error);
                    return[];
                }
            
        }
        async function createResource(dataToCreate){
            try{
                const response = await fetch(`{$baseURL}/resource`,{
                    method:'POST',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(dataToCreate),
                })
                if(response.ok){
                    const createResource = await response.json();
                    console.log('Resource created successfully.');
                    return createResource;
                }
                else
                {
                    console.error('Failed to create resource. Status code:', response.status);
                    return null;
           }
        }
           catch (error){
            console.error('An error has occured', error);
            return null;
           }
        }
        async function updateResource(resourceId, updatedData){
            try{
                const response = await fetch(`${baseURL}/resource/${resourceId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData),
                });
                if(response.ok){
                    const updateResource = await response.json();
                    console.log('Resource updated successfully.');
                    return updateResource; 
                }
                else {
                    console.error('Failed to update resource. Status code', response.status);
                    return null;
                }
            }
            catch(error){
                console.error('An error has occured', error);
                return null;
            }
        }
        async function deleteResourceInAPI(resourceId){
            try{
                const response = await fetch(`${baseURL}/resource/${resourceId}`,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(deleteData),
                });
                if(response.ok){
                    const deleteResource = await response.json();
                    console.log('Resource deleted successfully');
                    return deleteResource;
                }
                else
                {
                    console.error('Failed to delete resource. Status code', response.status);
                    return null;
                }
            }
            catch (error){
                console.error('An error has occured', error);
                return null;
            }
        }
        //Function to create a new user in API
        async function createUserInAPI(user){
            try{
                const response = await createUserInAPI(user);
                if(response){
                    users.push(response);
                    displayUsers();
                }
            }
            catch(error){
                console.error('An error occured:', error);
            }
        }
        //Function to update a new user
        async function updateUserInAPI(user){
            try{
                const response = await updateUserInAPI(user.id, user);
                if (response){
                    //Update the local user data if needed
                    displayUsers();
                }
            }
            catch (error){
                console.error('An error has occured:', error);
            }
            
        }
        //Function to delete a user from API
        async function deleteUserFromAPI(userId){
            try{
                await deleteResourceInAPI(userId);
                //Remove the user from local array if it exists
                users = users.filter(user=> user.id !== userId);
                displayUsers();
            }
            catch(error){
                console.error('An error has occured:', error);
            }
        }
        

        // Hard-coded initial user data
        var users = [
            { name: "Momina", age: 30, city: "New York" },
            { name: "Zohra", age: 25, city: "Lahore" },
            { name: "Ahsan", age: 35, city: "Karachi" }
        ];
        async function loadusersfromAPI(){
            users = await retrieveData();
            displayUsers();
        };

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
                var editedUser = {
                    id : users[editModalIndex].id,
                    name : editName.value,
                    age : editAge.value,
                    city : editCity.value, 
                };
                updateUserInAPI(editedUser);
                
                editModal.style.display = "none";
            
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
            
            };
            var cancelDeleteBtn= document.getElementById("cancelDelete");
            cancelDeleteBtn.onclick=function(){
                deleteModal.style.display="none";
            };
        }
    

        // Function to save users to local storage
        function saveUsersToAPI() {
            API.setItem("users", JSON.stringify(users));
        }

        // Function to load users from local storage
        function loadusersfromAPI() {
            var savedUsers = API.getItem("users");
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
    createUserInAPI(newUser);
    displayUsers();
    

    userModal.style.display = "none"; // Close the modal
});

        // Load initial users and display them
        loadusersfromAPI();
        
