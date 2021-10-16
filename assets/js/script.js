const modal = document.querySelector('.modal');
const modalClose = document.getElementById('modal-close');
const openModal = document.querySelector('.inner-top-btn');
const openPlanModal = document.querySelectorAll('.select-reward');
const radioPlanSelect = document.querySelectorAll('.radio-btn');
const headlinePlanSelect = document.querySelectorAll('.plan-name');
const bookmark = document.querySelector('.bookmark');
const inputFields = document.querySelectorAll('.input-field');
const pledgeButton = document.querySelectorAll('.pledge-btn');
var currentMoney = 89914;
var currentBackers = 5007;

bookmark.addEventListener('click', ()=> {
    const text = bookmark.querySelector('p');
    if (bookmark.classList.contains('bookmark-active')) {
        bookmark.classList.remove('bookmark-active')
        text.innerText = 'Bookmark'
    }else {
        bookmark.classList.add('bookmark-active')
        text.innerText = 'Bookmarked'
    }
})

modalClose.addEventListener('click',(e)=> {
    const errorMsg = document.querySelectorAll('.modal-donation-card-pledge');
    modal.classList.remove('modal-active');
    document.body.style.overflow = 'auto'
    errorMsg.forEach((message)=> {
        message.classList.remove('modal-donation-card-pledge-error')
    })
})

openModal.addEventListener('click', (e)=> {
    modal.classList.add('modal-active');
    document.body.style.overflow = 'hidden'
})

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

pledgeButton.forEach((button, index)=>{
    button.addEventListener('click', (e)=> {
        let minValue = parseInt(inputFields[index].getAttribute('min'));
        let currentValue = parseInt(inputFields[index].value);
        const parentElement = document.querySelectorAll('.modal-donation-card-pledge');
        if (currentValue < minValue || isNaN(currentValue)){
            parentElement[index].classList.add('modal-donation-card-pledge-error');
        }else {
            parentElement[index].classList.remove('modal-donation-card-pledge-error');
            parentElement[index].classList.add('modal-donation-card-pledge-loader');
            inputFields[index].value = '';
            trackerUpdate(currentValue)
            setTimeout(() => {
                parentElement[index].classList.remove('modal-donation-card-pledge-loader') 
            }, 1000);
        }
    })
})

const trackerUpdate =(value)=> {
    const currentMoneyDisplay = document.getElementById('current-sum');
    const currentBackersDisplay = document.getElementById('backers');
    const trackerLine = document.getElementById('inner-line');
    const maxMoney = 100000;
    currentMoney += value
    currentBackers ++;
    currentMoneyDisplay.innerText = currentMoney.toLocaleString('en-US')
    currentBackersDisplay.innerText = currentBackers.toLocaleString('en-US');
    if (currentMoney >= maxMoney){
        trackerLine.style.width = '100%'
    }else {
        trackerLine.style.width = `${parseInt(currentMoneyDisplay.innerText)}%`
    }
}