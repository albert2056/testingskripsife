function validatePortfolioForm() {
    var coupleName = document.getElementById("name").value;
    var eventDate = document.getElementById("eventDate").value;
    var image = document.getElementById("image").value;
    var outfitNamePort = document.getElementById("gownName").value;
    var venue = document.getElementById("venue").value;
    
    if (coupleName.trim() == '' || eventDate.trim() == '' || image.trim() == '' || outfitNamePort.trim() == '' || venue.trim() == '') {
        alert("Please fill in all fields.");
        return false;
    }

    var selectedDate = new Date(eventDate);
    var today = new Date();
    
    if (selectedDate > today) {
        alert("Tanggal pernikahan tidak boleh lebih dari hari ini!");
        return false;
    }
    
    return true;
}

function validateOutfitForm() {
    var outfitName = document.getElementById("name").value;
    var outfitCategory = document.getElementById("outfitCategoryId").value;
    var outfitQuantity = document.getElementById("qty").value;
    var outfitImage = document.getElementById("image").value;
    
    if (outfitName.trim() == '' || outfitCategory.trim() == '' || outfitQuantity.trim() == '' || outfitImage.trim() == '') {
        alert("Please fill in all fields.");
        return false;
    }
    
    return true;
}

//package
function formatPrice(input) {
    // Remove non-digit characters
    let unformattedValue = input.value.replace(/\D/g, '');
    // Format the value
    let formattedValue = unformattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // Set formatted value to visible input field
    input.value = formattedValue;
    // Set unformatted value to hidden input field
    document.getElementById('price').value = unformattedValue;
}

function validatePackageForm() {
    var packageName = document.getElementById("name").value;
    var packagePrice = document.getElementById("price_formatted").value;
    var packageDescription = document.getElementById("description").value;
    
    if (packageName.trim() == '' || packagePrice.trim() == '' || packageDescription.trim() == '') {
        alert("Please fill in all fields.");
        return false;
    }
    
    return true;
}


//book
function validateBookForm() {
    var name = document.getElementById("name").value;
    var totalUsher = document.getElementById("totalUsher").value;
    var eventDate = document.getElementById("eventDate").value;
    var venue = document.getElementById("venue").value;
    
    if (name.trim() == '' || totalUsher.trim() == '' || eventDate.trim() == '' || venue.trim() == '') {
        alert("Please fill in all fields.");
        return false;
    }

    var selectedDate = new Date(eventDate);
    var today = new Date();
    
    if (selectedDate < today) {
        alert("Tanggal pernikahan harus lebih dari hari ini!");
        return false;
    }
    
    return true;
}


// register
function validateRegisterForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;

    if (typeof name !== 'string' || name === "" || email === "" || phone === "" || password === "") {
        alert("Please fill in all fields with valid data types.");
        return false;
    } else if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    } else if (isNaN(phone) || phone.length < 10) {
        alert("Phone number must be at least 10 characters long and must be a number.");
        return false;
    } else {
      try {
        if (!validatePassword(password)) {
            return;
        }
      } catch (error) {
            alert(error.message);
            return;
      }

      document.getElementById("registrationForm").submit(); 
    }
    return true;
  }

  function isValidEmail(email) {
        return /\b[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}\b/.test(email) &&
        (email.includes(".com") || email.includes(".co.id"));
  }

  function validatePassword(password) {
    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
        throw new Error("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
        throw new Error("Password must contain at least one lowercase letter.");
    }
    if (!/\d/.test(password)) {
        throw new Error("Password must contain at least one number.");
    }
    return true;
  }