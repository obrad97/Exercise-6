const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content')
const thanksModal = document.querySelector('.thanks-modal');
const modalClose = document.getElementById('modal-close');
const thanksModalClose = document.querySelector('.thanks-btn');
const openModal = document.querySelector('.inner-top-btn');
const openPlanModal = document.querySelectorAll('.select-reward');
const radioPlanSelect = document.querySelectorAll('.radio-btn');
const headlinePlanSelect = document.querySelectorAll('.plan-name');
const bookmark = document.querySelector('.bookmark');
const inputFields = document.querySelectorAll('.input-field');
const pledgeButton = document.querySelectorAll('.pledge-btn');
const currentMoneyDisplay = document.getElementById('current-sum');
const currentBackersDisplay = document.getElementById('backers');
const trackerLine = document.getElementById('inner-line');
const mobileMenu = document.querySelector('.mobile-menu')
const menuHamburger = document.getElementById('menu-hamburger');
const menuClose = document.getElementById('menu-close');
var currentMoney = 10000;
var currentBackers = 256;
currentMoneyDisplay.innerText = `$${currentMoney.toLocaleString('en-US')}`;
currentBackersDisplay.innerText = currentBackers.toLocaleString('en-US');
trackerLine.style.width = `${parseInt(currentMoneyDisplay.innerText.split('$')[1].split(',')[0])}%`;

// Opens the mobile menu
menuHamburger.addEventListener('click', (e)=> {
    mobileMenu.classList.add('mobile-menu-active');
    document.body.style.overflow = 'hidden';
})
// Closes the mobile menu
menuClose.addEventListener('click', (e)=> {
    mobileMenu.classList.remove('mobile-menu-active');
    document.body.style.overflow = 'auto';
})
// Closes the mobile menu when clicked outside of it
mobileMenu.addEventListener('click',(e)=> {
    if (e.target != e.currentTarget){
        return
    }else {
        mobileMenu.classList.remove('mobile-menu-active');
        document.body.style.overflow = 'auto';
    }
})
// Enables/disables bookmark
bookmark.addEventListener('click', (e)=> {
    const text = bookmark.querySelector('p');
    if (bookmark.classList.contains('bookmark-active')) {
        bookmark.classList.remove('bookmark-active')
        text.innerText = 'Bookmark'
    }else {
        bookmark.classList.add('bookmark-active')
        text.innerText = 'Bookmarked'
    }
})
// Closes the "Thank you modal" prompt
thanksModalClose.addEventListener('click', (e)=>{
    thanksModal.style.display = "none";
    modalContent.style.display = "block";
    document.body.style.overflow = 'auto'
    modal.classList.remove('modal-active');
})
// Closes the modal
modalClose.addEventListener('click',(e)=> {
    const errorMsg = document.querySelectorAll('.modal-donation-card-pledge');
    modal.classList.remove('modal-active');
    document.body.style.overflow = 'auto'
    errorMsg.forEach((message)=> {
        message.classList.remove('modal-donation-card-pledge-error')
    })
})
//Opens the modal
openModal.addEventListener('click', (e)=> {
    modal.classList.add('modal-active');
    document.body.style.overflow = 'hidden'
})

// Enables the modal to be closed when clicking outside of it
modal.addEventListener('click', (e)=>{
    const errorMsg = document.querySelectorAll('.modal-donation-card-pledge');
    if(e.target != e.currentTarget){
        return
    }else {
        modal.classList.remove('modal-active');
        document.body.style.overflow = 'auto'
        errorMsg.forEach((message)=> {
            message.classList.remove('modal-donation-card-pledge-error')
        })
    }
})
// Opens the modal depending on which card was clicked
openPlanModal.forEach((button, index)=> {
    button.addEventListener('click',(e)=>{
        if (button.parentElement.parentElement.classList.contains('not-available')){
            return
        } else {
            modal.classList.add('modal-active');
            document.body.style.overflow = 'hidden'
            openPlan(index+1)
        }
    })
})

// These two functions expand the donation card when the modal is open
radioPlanSelect.forEach((plan, index) => {
    plan.addEventListener('click', (e)=> {
        openPlan(index)
    })
})

headlinePlanSelect.forEach((plan, index) => {
    plan.addEventListener('click', (e)=> {
        openPlan(index)
    })
})
// This opens the modal when clciked on the donation cards
const openPlan = (index) => {
    const planCard = document.getElementsByClassName('modal-donation-card');
    const errorMsg = document.querySelectorAll('.modal-donation-card-pledge');
    if(planCard[index].classList.contains('not-available')){
        return
    }else{
        const activePlan = document.querySelector('.modal-donation-card-active')
        if (activePlan && activePlan != planCard[index]){
            activePlan.classList.remove('modal-donation-card-active')
        }
        errorMsg.forEach((message)=> {
            message.classList.remove('modal-donation-card-pledge-error')
        })
        planCard[index].classList.toggle('modal-donation-card-active');
    }
}
// This checks if the required amount is entered when donating
pledgeButton.forEach((button, index)=>{
    button.addEventListener('click', (e)=> {
        let minValue = parseInt(inputFields[index].getAttribute('min'));
        let currentValue = parseInt(inputFields[index].value);
        const parentElement = document.querySelectorAll('.modal-donation-card-pledge');
        if (currentValue < minValue || isNaN(currentValue)){
            parentElement[index].classList.add('modal-donation-card-pledge-error');
            const errorMsg = document.querySelectorAll('.error-msg');
            errorMsg[index].innerText = `Minimum value for this plan is ${minValue}$`
        }else {
            parentElement[index].classList.remove('modal-donation-card-pledge-error');
            parentElement[index].classList.add('modal-donation-card-pledge-loader');
            inputFields[index].value = '';
            trackerUpdate(currentValue)
            setTimeout(() => {
                parentElement[index].classList.remove('modal-donation-card-pledge-loader');
                modalContent.style.display = "none";
                thanksModal.style.display = 'block';
            }, 1000);
        }
    })
})

// This updates the tracking values for donations
const trackerUpdate =(value)=> {
    const maxMoney = 100000;
    currentMoney += value
    currentBackers ++;
    currentMoneyDisplay.innerText = `$${currentMoney.toLocaleString('en-US')}`;
    currentBackersDisplay.innerText = currentBackers.toLocaleString('en-US');
    if (currentMoney >= maxMoney){
        trackerLine.style.width = '100%'
    }else {
        trackerLine.style.width = `${parseInt(currentMoneyDisplay.innerText.split('$')[1].split(',')[0])}%`
    }
}