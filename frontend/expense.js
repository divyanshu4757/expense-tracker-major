const form = document.getElementById('expenseForm');
const amount = document.getElementById('amount');
const description = document.getElementById('description');
const category = document.getElementById('category');
const sampleExpense = document.querySelector('.expense-item');
const expenseList = document.getElementById('expenseList');




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

console.log()



axios({
    method: "post",
    url: "http://localhost:5000/expenses",
    data: {
      amount: amount.value,
      description: description.value,
      category: category.value
    },
  })
  .then(response=>{

    const incomingData = response.data.data;
    createExpense(amount.value ,description.value,category.value , incomingData.id)

    form.reset();

  })




})




document.addEventListener('DOMContentLoaded',()=>{
    axios("http://localhost:5000/expenses")
    .then(result=>{
        const finalData = result.data;

        finalData.forEach(data => {
            createExpense(data.amount,data.description,data.category,data.id)
        });
    })
})


expenseList.addEventListener('click',(e)=>{

 

    if (e.target.classList.contains("delete-expense")) {
        let parent = e.target.parentNode;
       
        const id = parent.children[1].textContent;
       
        //console.log(id);
        
        axios.delete(`http://localhost:5000/delete/${id}`).then((response)=>{
            console.log(response.data.message);
            parent.remove();
        })
        
      }


        
})