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
        
            if(!res.ok) throw new Error("Failed to fecth")
            const data = await res.json()   
            return data
    } catch (error) {
        alert(error)
    }
}
const updateUser = async (id,newFullName)=>{
    try {
        const res = await fetch(`/user/${id}`,{
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({fullName:newFullName})
        })
            if(!res.ok) {
                const error = await res.json()
                throw new Error(error.message)
            }
            const data = await res.json()   
            return data
    } catch (error) {
        alert(error)
    }

}
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
        

    const res  = await createUser(input.value)

    e.target.querySelector('.input-success').innerHTML = res.message
    input.value = ""

}
const  handleUpdateSubmit = async (e)=>{
    e.preventDefault();
    const input = e.target.querySelector('.form-input')
    const select = e.target.querySelector('.form-select')

    if(input.value.split(' ').length != 2){
        e.target.querySelector('.input-error').innerHTML = "Please provide full name (two words)"
        return 
   }

    e.target.querySelector('.input-error').innerHTML = ""


    const res  = await updateUser(select.value,input.value)
    e.target.querySelector('.input-success').innerHTML = res.message
    input.value = ""
    await selectUiHandler(res.data);
    
}
const selectUiHandler = async (patients)=>{
        
    const selectEl = document.querySelector('.form-select')
    let selectMarkup = `<option value="" disabled selected>Choose a patient</option>`
   patients.forEach(pat=>{
        selectMarkup +=`<option value="${pat.id}">${pat.full_name}</option>`
    })

    selectEl.innerHTML = ""
    selectEl.insertAdjacentHTML("afterbegin",selectMarkup)   
}
const handleTableUi = async (patients)=>{
    const table = document.querySelector("#patients-tb")
    let tableList = ""
    console.log(patients);
    
    patients.forEach(pat=>{
        tableList +=`<tr>
                        <td>${pat.id}</td>
                            <td>${pat.full_name}</td>
                            <td>
                                <button class="delete-btn" onclick="handleDeleteUser(${pat.id}) >
                                    <i class="fas fa-trash"></i>
                                    Delete
                                </button>
                            </td>
                        </tr>`
                    })
                    
  table.innerHTML ="";
  table.insertAdjacentHTML('afterbegin',tableList)
    
    


    
}

if(window.location.pathname === '/editPatients'){
    
    const formContainer = document.querySelector('.content-container')
    const loadPage = async ()=> {
        const patients = await getAllUsers()
        const btns = document.querySelectorAll('.action-btn')

        btns[0].addEventListener('click',()=>{
            const markup = `
                    <div class="content-header">
                        <h2 class="content-title">Add New Patient</h2>
                        <p class="content-description">Enter patient details below</p>
                    </div>
                    
                    <form>
                        <div class="form-group">
                            <label for="fullname" class="form-label">Full Name</label>
                            <input 
                                type="text" 
                                id="fullname" 
                                name="fullname" 
                                class="form-input" 
                                placeholder="Enter patient's full name"
                                required
                            >
                            <span class="input-error">Please enter a valid full name</span>
                        </div>
                        <button type="submit" class="submit-btn">
                            <i class="fas fa-user-plus"></i>
                            Add Patient
                        </button>
                    </form>
            `
                    formContainer.innerHTML = "";
    
            formContainer.insertAdjacentHTML("afterbegin",markup)
    
            btns[0].className = "action-btn primary";
            btns[1].className = "action-btn secondary";
            btns[2].className = "action-btn secondary";
    
        })
        btns[1].addEventListener('click',async ()=>{
    let markup = "";
            if(!patients?.data?.length) {
                markup =   `<div class="table-container">
                              <div class="empty-state">
                                  <i class="fas fa-users fa-2x"></i>
                                  <p>No patients found</p>
                              </div>
                          </div>`
      
              }
            else{markup = `
        <div class="content-header">
            <h2 class="content-title">Edit Patient</h2>
            <p class="content-description">Update patient information</p>
        </div>
        
        <form onsubmit="handleUpdateSubmit(event)">
            <div class="form-group">
                <label for="select-user" class="form-label">Select Patient</label>
                <select id="select-user" name="select-user" class="form-select" required>
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
                <span class="input-error"></span>
                <span class="input-success"></span>
            </div>
            <button type="submit" class="submit-btn">
                <i class="fas fa-save"></i>
                Update Patient
            </button>
        </form>
            `
    
            }
            formContainer.innerHTML = "";
            formContainer.insertAdjacentHTML("afterbegin",markup)   
            if(patients?.data?.length){
                await selectUiHandler(patients.data) 
            }
            btns[0].className = "action-btn secondary";
            btns[1].className = "action-btn primary";
            btns[2].className = "action-btn secondary";
        })
        btns[2].addEventListener('click',async ()=>{
            let markup =""
            if(!patients?.data?.length) {
              markup =   `<div class="table-container">
                            <div class="empty-state">
                                <i class="fas fa-users fa-2x"></i>
                                <p>No patients found</p>
                            </div>
                        </div>`
    
            }else{
                 markup = `
                <div class="content-header">
                           <h2 class="content-title">Patient List</h2>
                           <p class="content-description">Manage your registered patients</p>
                       </div>
                        <div class="patients-table-container">
                       <table class="patients-table">
                           <thead>
                               <tr>
                                   <th>ID</th>
                                   <th>Patient Name</th>
                                   <th>Actions</th>
                               </tr>
                           </thead>
                           <tbody id="patients-tb">
                               
                           </tbody>
                       </table>
                       </div>
               `
            }
               
     
            formContainer.innerHTML = "";
            formContainer.insertAdjacentHTML("afterbegin",markup)   
            if(patients?.data?.length){
            await handleTableUi(patients.data)
            }
            btns[0].className = "action-btn secondary";
            btns[1].className = "action-btn secondary";
            btns[2].className = "action-btn primary";
        })

    };
    loadPage()
}
