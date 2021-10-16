const modal = document.getElementsByClassName('modal')[0];
const modalClose = document.getElementById('modal-close');
const openModal = document.querySelectorAll('.select-reward');
const radioPlanSelect = document.querySelectorAll('.radio-btn');
const headlinePlanSelect = document.querySelectorAll('.plan-name');

modalClose.addEventListener('click',()=> {
    modal.classList.remove('modal-active');
    document.body.style.overflow = 'auto'
})

modal.addEventListener('click', (e)=>{
    if(e.target != e.currentTarget){
        return
    }else {
        modal.classList.remove('modal-active');
        document.body.style.overflow = 'auto'
    }
})

openModal.forEach((button)=> {
    button.addEventListener('click',(e)=>{
        if (button.parentElement.parentElement.classList.contains('not-available')){
            return
        } else {
            modal.classList.add('modal-active');
            document.body.style.overflow = 'hidden'
        }
    })
})

const openPlan = (index) => {
    const planCard = document.getElementsByClassName('modal-donation-card');
    if(planCard[index].classList.contains('not-available')){
        return
    }else{
        const activePlan = document.querySelector('.modal-donation-card-active')
        if (activePlan && activePlan != planCard[index]){
            activePlan.classList.remove('modal-donation-card-active')
        }
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