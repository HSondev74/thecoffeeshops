let input_gmail = document.getElementById("input_gmail")
let gmail_user = []
let RegGmail = /^\w+@\w+\.com$/i

function click_gmail(e){
    e.preventDefault()
    test = RegGmail.test(input_gmail.value)
    if(test){
        alert("Đã nhận được email của bạn!") 
        gmail_user[gmail_user.length - 1] = input_gmail.value
        // console.log(gmail_user[gmail_user.length - 1])
        // return gmail_user
        let json = JSON.stringify(gmail_user[gmail_user.length -1])
        // console.log(json)
        localStorage.setItem("gmail khách hàng",json)
    }else{
        alert("email không hợp lệ")
    }
}
// document.addEventListener("keyup",click_gmail)
document.getElementById("form_gmail").addEventListener("submit",click_gmail)


