//User function
const getUserById = async (userId)=>{    
    try {
        const res = await fetch(`/user/${userId}`)
        if(!res.ok) throw new Error("Failed to fecth")
            const data = await res.json()   
            return data
    } catch (error) {
        console.log(error);
    }
}

const getAllUsers = async ()=>{
    try {
        const res = await fetch('/user/all')
        if(!res.ok) throw new Error("Failed to fecth")
            const data = await res.json()       
         return data
    } catch (error) {
        console.log(error);
        
    }

}
const createUser = async (fullName)=>{
    
    try {
        const res = await fetch(`/user`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({fullName})
        })
        console.log(res);
        
            if(!res.ok) throw new Error("Failed to fecth")
            const data = await res.json()   
            return data
    } catch (error) {
        console.log(error);
    }
}
const updateUser = async (id,newFullName)=>{}
const deleteUser = async (userId)=>{}
//Measure functions
const getAllMeasuresAvg = async (startDate,endDate)=>{}
const getAllUserMeasures = async (userId,startDate,endDate)=>{}
const getAllMeasures = async ()=>{
    try {
        const res = await fetch('/measure/all')
        if(!res.ok) throw new Error("Failed to fecth")
            const data = await res.json() 
        return data      
    } catch (error) {
        console.log(error);
    }

}
const getMeasureById = async (measureId)=>{}
const createMeasure = async (userId,syst,dias,pulse)=>{
    try {
        const res = await fetch(`/measure/${userId}`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(syst,dias,pulse)
        })
            if(!res.ok) throw new Error("Failed to fecth")
            const data = await res.json()   
            return data
    } catch (error) {
        console.log(error);
    }
}
const updateMeasure = async (measureId,newSyst,newDias,newPulse)=>{}
const deleteMeasure = async (measureId)=>{}


//Home page functions
if(window.location.pathname === '/'){
    const getData = async ()=>{
       const [users,measures] = await Promise.all([getAllUsers(),getAllMeasures()])
       document.querySelector('#total-measures').innerHTML = measures.data.length || 0  
       document.querySelector('#total-patients').innerHTML = users.data.length || 0
    }
    getData()
}


const  handleCreateSubmit = async (e)=>{
    e.preventDefault();
    const input = e.target.querySelector('.form-input')

        if(input.value.split(' ').length != 2){
             e.target.querySelector('.input-error').innerHTML = "Please provide full name (two words)"
             return 
        }
       

        e.target.querySelector('.input-error').innerHTML = ""
        

    const data  = await createUser(input.value)
    console.log(data);
    
    
    

}
const  handleUpdateSubmit = async (e)=>{
    e.preventDefault();
    const input = e.target.querySelector('.form-input')

    if(input.value.length < 2)
        e.target.querySelector('.input-error').innerHTML = "Name needs to be two letters at least!)"

        if(input.value.split(' ').length != 2)
        e.target.querySelector('.input-error').innerHTML = "Please provide full name (two words)"


                e.target.querySelector('.input-error').innerHTML = ""
        console.log("s");
        
        return 

    createUser(input.value)
}
if(window.location.pathname === '/editPatients'){
    
    const formContainer = document.querySelector('.form-container')
    
    const btns = document.querySelectorAll('.action-btn')
    btns[1].addEventListener('click',()=>{
        const markup = `<h2 class="form-title">Edit Patient</h2>
                <form onsubmit="handleUpdateSubmit(event)">
                    <div class="form-group">
                        <label for="select-user" class="form-label">Select Patient</label>
                        <select id="select-user" name="select-user" class="form-select" required>
                            <option value="" disabled selected>Choose a patient</option>
                            <option value="1">John Doe</option>
                            <option value="2">Jane Smith</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="new-fullname" class="form-label">New Full Name</label>
                        <input 
                            type="text" 
                            id="new-fullname" 
                            name="new-fullname" 
                            class="form-input" 
                            placeholder="Enter new full name"
                            required
                        >
                    </div>
                    <button type="submit" class="submit-btn">
                        <i class="fas fa-save"></i>
                        Update Patient
                    </button>
                </form>`
                formContainer.innerHTML = "";
        formContainer.insertAdjacentHTML("afterbegin",markup)    
        btns[0].className = "action-btn secondary";
        btns[1].className = "action-btn primary";
    })

    btns[0].addEventListener('click',()=>{
        const markup = `<h2 class="form-title">Add New Patient</h2>
                <form onsubmit="handleCreateSubmit(event)">
                    <div class="form-group">
                        <label for="fullname" class="form-label">Full Name</label>
                        <input 
                            type="text" 
                            id="fullname" 
                            name="fullname" 
                            class="form-input" 
                            placeholder="Enter patient's full name (example: Jhon Doe)"
                            required
                        >
                        <span class="input-error"></span>
                    </div>
                    <button type="submit" class="submit-btn">
                        <i class="fas fa-user-plus"></i>
                        Add Patient
                    </button>
                </form>`
                formContainer.innerHTML = "";

        formContainer.insertAdjacentHTML("afterbegin",markup)

        btns[1].className = "action-btn secondary";
        btns[0].className = "action-btn primary";


    })



}
