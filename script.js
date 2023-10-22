
const baseURL = "https://65311eb24d4c2e3f333c6a6c.mockapi.io/table";

// Function to display users in the table
function displayUsers(data) {
  var tbody = document.getElementById("userTableBody");
  tbody.innerHTML = "";

  data.forEach(function (user, index) {
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
    editButton.addEventListener("click", function () {
      openEditModal(index);
    });

    var deleteButton = document.createElement("span");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
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
let users;
// Fetch the data from the API and then call displayUsers
const fetchingData = () => {
  fetch(baseURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch data");
      }
    })
    .then(function (data) {
      displayUsers(data);
      users= data
    })
    .catch(function (error) {
      console.error(error);
    });
};
fetchingData();
// POST - Create new user
function createUserInAPI(userData) {
  fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      return response.json();
    })
    .then(() => {
      fetchingData();
    })
    .catch((error) => {
      console.error(error);
    });
}

// PUT - Update existing user
function updateUserInAPI(updatedUser) {
  console.log(updatedUser)
  fetch(`${baseURL}/${updatedUser.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      return response.json();
    })
    .then(() => {
      fetchingData();
    })
    .catch((error) => {
      console.error(error);
    });
}

// DELETE - Delete user
function deleteUserInAPI(userId) {
  fetch(`${baseURL}/${userId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return response.json();
    })
    .then(() => {
      fetchingData();
    })
    .catch((error) => {
      console.error(error);
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
  editForm.onsubmit = function (event) {
    event.preventDefault();
    var editedUser = {
      id: users[index].id,
      name: editName.value,
      age: editAge.value,
      city: editCity.value,
    };
    updateUserInAPI(editedUser);

    editModal.style.display = "none";
  };

  // Handle the cancel button
  var closeEditModalBtn = document.getElementById("closeEditModalBtn");
  closeEditModalBtn.onclick = function () {
    editModal.style.display = "none";
  };
}

// Function to delete a user
function openDeleteModal(index) {
  var deleteModal = document.getElementById("deleteModal");
  deleteModal.style.display = "block";

  var confirmDeleteBtn = document.getElementById("confirmDelete");
  confirmDeleteBtn.onclick = function () {
    deleteUserInAPI(users[index].id)
    deleteModal.style.display = "none";
    fetchingData();
  };
  var cancelDeleteBtn = document.getElementById("cancelDelete");
  cancelDeleteBtn.onclick = function () {
    deleteModal.style.display = "none";
  };
}

// Open Modal when the Create New User button is pressed
const openModalBtn = document.getElementById("openModalBtn");
const userModal = document.getElementById("userModal");
const closeModalBtn = document.getElementById("closeModalBtn");

openModalBtn.addEventListener("click", function () {
  userModal.style.display = "block";
});

//Close Modal when "x" or background is clicked

closeModalBtn.addEventListener("click", function () {
  userModal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == userModal) {
    userModal.style.display = "none";
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
  fetchingData();

  userModal.style.display = "none"; // Close the modal
});