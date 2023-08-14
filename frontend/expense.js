const form = document.getElementById('expenseForm');
const amount = document.getElementById('amount');
const description = document.getElementById('description');
const category = document.getElementById('category');
const sampleExpense = document.querySelector('.expense-item');
const expenseList = document.getElementById('expenseList');
const premium = document.getElementById('premium');
const premiumSuccess = document.querySelector('#premium-success');



function createExpense(amount, description, category , id){

    const clonedExpense = sampleExpense.cloneNode(true);

    const expenseDescription = clonedExpense.querySelector('.expense-description');
    const expenseCategory = clonedExpense.querySelector('.expense-category');
    const expenseAmount = clonedExpense.querySelector('.expense-amount');
    const expenseId = clonedExpense.querySelector('#expenseId');

    expenseId.textContent = id;
    expenseId.style.display = 'none';
    expenseDescription.textContent = description;
    expenseCategory.textContent =category;
    expenseAmount.textContent = `$   ${amount}`;
    expenseList.appendChild(clonedExpense);
}



form.addEventListener('submit',(e)=>{

e.preventDefault();
const token = localStorage.getItem('token');





axios({
    method: "post",
    url: "http://localhost:5000/expenses",
    data: {
      amount: amount.value,
      description: description.value,
      category: category.value
    },
    headers:{"Authorization":token}

  })
  .then(response=>{

    const incomingData = response.data.data;
    createExpense(amount.value ,description.value,category.value , incomingData.id)

    form.reset();

  })




})




document.addEventListener('DOMContentLoaded',()=>{
const token = localStorage.getItem('token');

    axios("http://localhost:5000/expenses",{
      headers:{"Authorization":token}
    })
    .then(result=>{
        const finalData = result.data;
        console.log(result);

        if(finalData.isPremium == true){
          premiumSuccess.textContent ="You are a premium member now"
      premiumSuccess.style.fontSize ='15px'
      premiumSuccess.style.fontWeight ='bold'
      premiumSuccess.style.color ='green'

        }

        finalData.forEach(data => {
            createExpense(data.amount,data.description,data.category,data.id)
        });
    })
})


expenseList.addEventListener('click',(e)=>{

const token = localStorage.getItem('token');
 

    if (e.target.classList.contains("delete-expense")) {
        let parent = e.target.parentNode;
       
        const id = parent.children[1].textContent;
       
        //console.log(id);
        
        axios.delete(`http://localhost:5000/delete/${id}`,{
          headers:{"Authorization":token}}).then((response)=>{
            console.log(response.data.message);
            parent.remove();
        })
        
      }


        
})


 

premium.addEventListener('click', async (e)=>{
    
  const token = localStorage.getItem('token');
  
  //console.log(token);


 
  
  const response =await axios.get(`http://localhost:5000/purchase/premiummembership`,{
    headers:{"Authorization":token}
  });
  console.log(response);


   

 
  var option ={
    "key":response.data.key_id,
    "order_id":response.data.result.orderid,
    "handler": async function (response) {
         
      await axios.post(`http://localhost:5000/purchase/updatetransactionstatus`,{
        order_id:option.order_id,
        payment_id:response.razorpay_payment_id,
      },{headers:{"Authorization":token}})

      alert("you are a premium member now")
      premium.remove();
      premiumSuccess.textContent ="You are a premium member now"
      premiumSuccess.style.fontSize ='15px'
      premiumSuccess.style.fontWeight ='bold'

    },


  };

  const rzp1 = new Razorpay(option);

  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response) {
    console.log(response)
    alert("payment failed")
  })
})


  