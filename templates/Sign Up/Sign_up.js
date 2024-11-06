function check_errors() {
    const Pass = document.getElementById('password').value;
    const Re_Pass = document.getElementById('re_password').value;
    const Upper_Case = /[A-Z]/.test(password);
    const Sp_Char = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (Pass !== Re_Pass) {
        alert("Passwords do not match!");
        return false; 
    }

    if (Pass.length < 6) {
        alert("Password must be at least 6 characters long!");
        return false;
    }

    if (!Upper_Case && !Sp_Char) {
        alert("Password must contain at least one uppercase letter and one special character!");
        return false;
    }
    return true;
}

function Password_see(id, element) {
    const Pass_input = document.getElementById(id);
    const Eye_icon = element.querySelector("i");

    if (Pass_input.type === "password") {
        Pass_input.type = "text";
        Eye_icon.classList.remove("bi-eye-slash-fill");
        Eye_icon.classList.add("bi-eye-fill");
    } else {
        Pass_input.type = "password";
        Eye_icon.classList.remove("bi-eye-fill");
        Eye_icon.classList.add("bi-eye-slash-fill");
    }
}
