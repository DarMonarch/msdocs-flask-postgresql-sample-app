function Password_see(passwordFieldId, iconElement) {
    const Pass_input = document.getElementById(passwordFieldId);
    const Eye_icon = iconElement.querySelector('i');

    if (Pass_input.type === "password") {
        Pass_input.type = "text";
        Eye_icon.classList.remove('bi-eye-slash-fill');
        Eye_icon.classList.add('bi-eye-fill');
    } else {
        Pass_input.type = "password";
        Eye_icon.classList.remove('bi-eye-fill');
        Eye_icon.classList.add('bi-eye-slash-fill');
    }
}
