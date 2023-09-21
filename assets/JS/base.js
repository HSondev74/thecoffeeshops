/**
 * Đây là file js dùng chung cho các trang.
 */
/////////////////////////
// Global variables
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const header = $('.header');
const searchBar = $('.search-bar');
const btnCloseSearch = $('.search-bar__close');
const btnSearch = $('.nav__btn--search');
const btnUser = $('.nav__btn--user');
const modal = $('.modal');
const modalClose = $('.modal__close');
const modalOverlay = $('.modal__overlay');
const modalContent = $('.modal__content');
const body = $('body');
const modalMains = $$('.modal__main');
const btnLogin = $('.modal__btn--login');

const modalAccount = $('.modal--account');
const modalLogin = $('.modal--login');
const modalRegister = $('.modal--register');
const modalError = $('.modal__error');
const modalInputs = $$('.modal__input');

const navCart = $('.nav__cart');
const navCartProduct = $('.nav__cart-product');
const navCartNoProduct = $('.nav__cart-no-product');
const navCartList = $('.nav__cart-list');
const navCartTotal = $('.nav__cart-total');
const navCartBtns = $('.nav__cart-btns');
const shopList = $('.shop__list');
const cartQTY = $('.nav__btn--cart-qty');


let foundAccount;

let accounts = [];
//////////////////////////
// classes
class Account {
    cart = [];
    isLogging = false;

    constructor(email, password, name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
}

const account1 = {
    cart: [
        {
            name: 'Cà phê England',
            qty: 2,
            price: 150000,
            imgUrl: './assets/img/product-1.jpg',
        },
        {
            name: 'Cà phê London',
            qty: 1,
            price: 200000,
            imgUrl: './assets/img/product-2.jpg',
        },
    ],

    isLogging: false,

    email: '123@gmail.com',
    password: '123',
    name: 'Holland',

};


const account2 = {
    cart: [
        {
            name: 'Cà phê America',
            qty: 2,
            price: 3500000,
            imgUrl: './assets/img/product-1.jpg',
        },
        {
            name: 'Cà phê London',
            qty: 3,
            price: 200000,
            imgUrl: './assets/img/product-2.jpg',
        },
    ],

    isLogging: false,

    email: '456@gmail.com',
    password: '456',
    name: 'Joker',

};

// accounts = [account1, account2];

//////////////////////////
// Local Storage
const setLocalStorage = function () {
    localStorage.setItem('accounts', JSON.stringify(accounts));
};

const getLocalStorage = function () {
    accounts = JSON.parse(localStorage.getItem('accounts'));
    if (!accounts) accounts = [];
};


//////////////////////////
// Tính scrollbar width
document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.offsetWidth) + 'px');

//////////////////////////
// Làm header sticky khi bắt đầu lăn con trỏ chuột
window.addEventListener('scroll', function () {
    if (window.scrollY !== 0) {
        header.classList.add('sticky');
        searchBar.classList.add('sticky');
    }
    else {
        header.classList.remove('sticky');
        searchBar.classList.remove('sticky');
    }
});

//////////////////////////
// Chức năng search bar ở ô tìm kiếm

// Hiển thị search bar khi ấn nút tìm kiếm trên header
btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    header.classList.add('hidden');
    searchBar.classList.remove('hidden');
});

// Tắt search bar khi ấn nút close
btnCloseSearch.addEventListener('click', (e) => {
    e.preventDefault();
    header.classList.remove('hidden');
    searchBar.classList.add('hidden');
});



//////////////////////////
// Hiển thị modal đăng nhập khi ấn nút user
// Reset modal login
const resetModal = function () {
    modalError.innerHTML = '';
    modalInputs.forEach(modalInput => modalInput.value = '');
};

const showModalError = function (error) {
    modalError.innerHTML = error;
};

const closeModal = () => {
    resetModal();
    modal.classList.add('modal__closing');
    body.classList.remove('open-modal');

    modalContent.addEventListener('animationend', () => {
        modal.classList.remove('modal__closing');
        modal.classList.remove('modal__active');
        header.style.transition = 'all 0.5s';
    }, { once: true });
};

btnUser.addEventListener('click', (e) => {
    resetModal();
    e.preventDefault();
    body.classList.add('open-modal');
    modal.classList.add('modal__active');
    header.style.transition = 'initial';
    setCurrentAccount();
});

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', closeModal);

// Giỏ hàng
// Hiển thị giao diện tương ứng có hàng hay không có hàng
const renderCartProduct = function () {
    let html = '';
    let totalPrice = 0;

    if (!foundAccount) return;

    foundAccount.cart.forEach(item => {
        html += `
        
           <li class="nav__cart-item">
                <div class="nav__cart-img">
                    <img src="${item.imgUrl}" alt="">
                </div>
    
                <div class="nav__cart-content">
                    <h4 class="nav__cart-name">${item.name}</h4>
                    <p class="nav__cart-qty">
                        Số lượng: <span class="nav__cart-num">${item.qty}</span>
                    </p>
                    <p class="nav__cart-price">${item.price} VNĐ</p>
                </div>
    
                <button class="nav__cart-close">
                    <i class="fa-solid fa-xmark"></i>
                </button>                      
            </li>    
      
        `;
        totalPrice += item.price * item.qty;
    });

    navCartList.innerHTML = html;

    html = `    
            Total:
            <span class="nav__cart-total-price">${totalPrice} VNĐ</span>                                          
    `;

    navCartTotal.innerHTML = html;

    html = `
            <a href="" class="nav__cart-btn">Giỏ Hàng</a>
            <a href="" class="nav__cart-btn">Thanh Toán</a>                       
    `;

    navCartBtns.innerHTML = html;
    cartQTY.innerHTML = foundAccount.cart.length;
};

const renderCart = function () {
    if (!foundAccount || foundAccount.cart.length === 0) {
        navCartNoProduct.classList.remove('hidden');
        navCartProduct.classList.add('hidden');
        cartQTY.classList.add('hidden');
        return;
    }
    else {
        navCartNoProduct.classList.add('hidden');
        navCartProduct.classList.remove('hidden');
        cartQTY.classList.remove('hidden');
    }
    renderCartProduct();
};

const addProduct = function (btn) {
    const product = btn.closest('.shop__item');
    const imgUrl = product.querySelector('.shop__item-img').getAttribute('src');
    const name = product.querySelector('.shop__item-name').innerHTML;
    const price = product.querySelector('.shop__item-price')
        .innerHTML.slice(0, -4).replace(/\./g, '');

    let dupProduct = false;
    // kiểm tra sản phẩm này đã có trong giỏ hàng chưa?
    foundAccount.cart.forEach(item => {
        if (item.name === name) {
            item.qty++;
            dupProduct = true;
        }
    });

    if (dupProduct) return;

    const newProduct = { name, qty: 1, price, imgUrl, };
    foundAccount.cart.push(newProduct);
};

// Loại bỏ hàng ra khỏi giỏ hàng
const removeProduct = function (removedItem) {
    const removedItemName = removedItem
        .querySelector('.nav__cart-name')
        .innerHTML.trim();

    for (let i = 0; i < foundAccount.cart.length; i++) {
        if (foundAccount.cart[i].name === removedItemName) {
            foundAccount.cart.splice(i, 1);
        }
    }

    setLocalStorage();
    renderCart();
};


//////////////////////////
// chức năng login, logout, register

// hiển thị modal account
const renderAccount = function (foundAccount) {
    const html = `
                    <div class="modal__icon">
                        <img src="./assets/img/login-icon.png" alt="">
                    </div>
                    <h3 class="modal__header">Chào mừng</h3>
                    <p class="modal__account-name">${foundAccount.name},</p>
                    <ul class="modal__list">
                        <li class="modal__item">
                            <a href="#" class="modal__link">
                                <i class="modal__item-icon fa-solid fa-user"></i>
                                Thông tin tài khoản
                            </a>
                        </li>

                        <li class="modal__item">
                            <a href="#" class="modal__link">
                                <i class="modal__item-icon fa-solid fa-cart-shopping"></i>
                                Giỏ hàng
                            </a>
                        </li>

                        <li class="modal__item">
                            <a href="#" class="modal__link">
                                <i class="modal__item-icon fa-solid fa-gear"></i>
                                Cài đặt
                            </a>
                        </li>
                    </ul>
                    <button class="modal__btn modal__btn--logout">Đăng xuất</button>
    `;

    modalAccount.innerHTML = html;
    foundAccount.isLogging = true;
};

// Hiển thị modal main tương ứng
const renderModalMain = function (modalActive) {
    modalMains.forEach(modalMain => {
        modalMain.classList.remove('modal__main--active');
    });

    modalActive.classList.add('modal__main--active');
};

// xử lý login
const loginHandler = function (modalBtn) {
    const email = modalLogin.querySelector('.modal__input[type = "email"]').value;
    const password = modalLogin.querySelector('.modal__input[type = "password"]').value;

    accounts.forEach(account => {
        if (email === account.email && password === account.password) {
            foundAccount = account;
        }
    });

    if (!foundAccount) {
        showModalError('Vui lòng kiểm tra lại email và mật khẩu!');
        return;
    }

    renderModalMain(modalAccount);

    renderAccount(foundAccount);

    renderCart();

    // xóa dữ liệu ở input sau khi đăng nhập thành công
    resetModal();

    setLocalStorage();

};

// xử lý logout
const logoutHandler = function () {
    renderModalMain(modalLogin);
    foundAccount.isLogging = false;
    foundAccount = undefined;
    renderCart();
    setLocalStorage();
};

// xử lý register
const registerHandler = function () {
    const name = modalRegister.querySelector('.modal__input[type = "text"]').value;
    const email = modalRegister.querySelector('.modal__input[type = "email"]').value;
    const modalPasswords = modalRegister.querySelectorAll('.modal__input[type = "password"]');
    const validateEmail = (email) =>
        email.toLowerCase()
            .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    if (!name.trim()) {
        showModalError('Vui lòng nhập tên của bạn!');
        return;
    }

    if (!validateEmail(email)) {
        showModalError('Email nhập vào không hợp lệ!');
        return;
    }

    for (acc of accounts) {
        if (acc.email === email) {
            showModalError('Email này đã tồn tại!');
            return;
        }
    }

    if (!modalPasswords[0].value) {
        showModalError('Vui lòng nhập mật khẩu');
        return;
    }

    if (modalPasswords[0].value !== modalPasswords[1].value) {
        showModalError('Mật khẩu nhập lại không trùng khớp!');
        return;
    }

    const newAccount = new Account(email, modalPasswords[0].value, name.trim());
    foundAccount = newAccount;
    accounts.push(newAccount);

    //Lưu tài khoản mới
    renderAccount(newAccount);
    setLocalStorage();

    resetModal();
    renderModalMain(modalAccount);
    renderCart();

};

// xử lý event trong modal content
modalContent.addEventListener('click', function (e) {
    e.preventDefault();
    if (!e.target.classList.contains('modal__btn') &&
        !e.target.classList.contains('modal__btn-link')) return;
    const modalBtn = e.target;

    //Ẩn modal login, hiển thị modal register
    // khi ấn nút đăng ký trong modal login và ngược lại
    if (modalBtn.classList.contains('modal__btn-link--register')) {
        renderModalMain(modalRegister);
        resetModal();
    }

    if (modalBtn.classList.contains('modal__btn-link--login')) {
        renderModalMain(modalLogin);
        resetModal();
    }

    // Thực hiện đăng nhập
    if (modalBtn.classList.contains('modal__btn--login')) {
        loginHandler(modalBtn);
    }

    // Thực hiện đăng xuất
    if (modalBtn.classList.contains('modal__btn--logout')) {
        logoutHandler();
    }

    // Thực hiện đăng ký
    if (modalBtn.classList.contains('modal__btn--register')) {
        registerHandler();
    }
});

const setCurrentAccount = function () {
    for (acc of accounts) {
        if (acc.isLogging) {
            foundAccount = acc;
            renderModalMain(modalAccount);
            renderAccount(foundAccount);
            return;
        }
    }

    renderModalMain(modalLogin);
};


shopList?.addEventListener('click', function (e) {
    if (!e.target.classList.contains('shop__btn')
        && !e.target.closest('.shop__btn')
    ) return;
    e.preventDefault();
    if (!foundAccount) return;
    addProduct(e.target);
    renderCart();
    setLocalStorage();
});


// Ấn nút x => loại bỏ hàng ra khỏi giỏ hàng
navCart.addEventListener('click', function (e) {
    e.preventDefault();
    if (!e.target.classList.contains('nav__cart-close')
        && !e.target.closest('.nav__cart-close')) return;

    const removedItem = e.target.closest('.nav__cart-item');
    removeProduct(removedItem);
});


const init = function () {
    resetModal();
    getLocalStorage();
    setCurrentAccount();
    renderCart();
};


init();