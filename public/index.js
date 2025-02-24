//User function
const getUserById = async (userId)=>{    
    try {
        const res = await fetch(`/user/${userId}`)
        if(!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
        }            const data = await res.json()   
            return data
    } catch (error) {
        alert(error.message)
    }
}
const getAllUsers = async ()=>{
    try {
        const res = await fetch('/user/all')
        if(!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
        }
                    const data = await res.json()       
         return data
    } catch (error) {
        alert(error.message)
        
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
        if(!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
        }            const data = await res.json()   
            return data
    } catch (error) {
        alert(error.message)
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
        alert(error.message)
    }

}
const deleteUser = async (userId)=>{
    try {
        const res = await fetch(`/user/${userId}`,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
              },
        })
            if(!res.ok) {
                const error = await res.json()
                throw new Error(error.message)
            }
            const data = await res.json()   
            return data
    } catch (error) {
        alert(error.message)
    }
}
//Measure functions
const getAllMeasuresAvg = async (userId,startDate,endDate)=>{
    try {
        let res;
        if(startDate && endDate){
            res = await fetch(`/measure/avg/${userId}`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({startDate,endDate})
            })
        }else{
            res = await fetch(`/measure/avg/${userId}`,{
                method:'POST'})
        }
        if(!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
        }
        const data = await res.json() 
        return data      
    } catch (error) {
        alert(error);
    }
}
const getAllUserMeasures = async (userId,startDate,endDate)=>{
    try {
        const res = await fetch('/measure/all')
        if(!res.ok) throw new Error("Failed to fecth")
            const data = await res.json() 
        return data      
    } catch (error) {
        console.log(error);
    }
}
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
const createMeasure = async (values)=>{
    try {
        const res = await fetch(`/measure/${values.userId}`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values)
        })
            if(!res.ok) throw new Error("Failed to fecth")
            const data = await res.json()           
            return data
    } catch (error) {
        console.log(error);
    }
}
const updateMeasure = async (measureId,newSyst,newDias,newPulse)=>{
    try {
        const res = await fetch(`/measure/${measureId}`,{
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({syst:newSyst,dias:newDias,pulse:newPulse})
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
const deleteMeasure = async (measureId)=>{
    try {
        const res = await fetch(`/measure/${measureId}`,{
            method:'DELETE'
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


//Home page functions
if(window.location.pathname === '/'){
    const getData = async ()=>{
       const [users,measures] = await Promise.all([getAllUsers(),getAllMeasures()])
       document.querySelector('#total-measures').innerHTML = measures.data.length || 0  
       document.querySelector('#total-patients').innerHTML = users.data.length || 0
    }
    getData()
}

let patients = []
const selectUiHandler = async ()=>{    
    const selectEl = document.querySelectorAll('.form-select')
    let selectMarkup = `<option value="" disabled selected>Choose a patient</option>`
   patients.forEach(pat=>{
        selectMarkup +=`<option value="${pat.id}">${pat.full_name}</option>`
    })
    selectEl.forEach(select=>{
        select.innerHTML = ""
        select.insertAdjacentHTML("afterbegin",selectMarkup)   
    })
}


//Manage patients page funtions
const handleCreateSubmit = async (e)=>{
    e.preventDefault();
    const input = e.target.querySelector('.form-input')

        if(input.value.split(' ').length != 2){
             e.target.querySelector('.input-error').innerHTML = "Please provide full name (two words)"
            e.target.querySelector('.input-success').innerHTML = ""

             return 
        }
       
        e.target.querySelector('.input-error').innerHTML = ""
        

    const res  = await createUser(input.value)
    patients = await getAllUsers().then(res=>res.data)
    e.target.querySelector('.input-success').innerHTML = res.message
    input.value = ""

}
const  handleUpdateSubmit = async (e)=>{
    e.preventDefault();
    const input = e.target.querySelector('.form-input')
    const select = e.target.querySelector('.form-select')

    if(input.value.split(' ').length != 2){
        e.target.querySelector('.input-error').innerHTML = "Please provide full name (two words)"
        e.target.querySelector('.input-success').innerHTML = ""
        return 
   }

    e.target.querySelector('.input-error').innerHTML = ""

    const res  = await updateUser(select.value,input.value)    
    patients = res.data
    e.target.querySelector('.input-success').innerHTML = res.message
    input.value = ""
    await selectUiHandler(res.data);

    
}
const handleDeleteUser= async (userId) =>{
   const newPatients =  await deleteUser(userId);
   patients = newPatients.data
    handleUserTableUi()

    document.querySelector('.success').innerHTML = newPatients?.message
    setTimeout(()=>{
    document.querySelector('.success').innerHTML = ""
    },3000)
    
}
const handleUserTableUi = async ()=>{
    const table = document.querySelector("#patients-tb")
    let tableList = ""    
    patients.forEach(pat=>{
        tableList +=`<tr>
                        <td>${pat.id}</td>
                            <td>${pat.full_name}</td>
                            <td>
                                <button class="delete-btn" onclick="handleDeleteUser(${pat.id})">
                                    <i class="fas fa-trash"></i>
                                    Delete
                                </button>
                            </td>
                        </tr>
                        `
                    })   
  table.innerHTML ="";
  table.insertAdjacentHTML('afterbegin',tableList)
}

if(window.location.pathname === '/editPatients'){  

    const getData = async ()=> {
        patients = await getAllUsers().then(res=>res.data)
        
        const formContainer = document.querySelector('.content-container')
        const btns = document.querySelectorAll('.action-btn')

        btns[0].addEventListener('click',async ()=>{
            const markup = `
                    <div class="content-header">
                        <h2 class="content-title">Add New Patient</h2>
                        <p class="content-description">Enter patient details below</p>
                    </div>
                    
                    <form onsubmit="handleCreateSubmit(event)">
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
                <span class="input-success"></span>

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
            if(!patients?.length) {
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
            if(patients?.length){                
                await selectUiHandler() 
            }
            btns[0].className = "action-btn secondary";
            btns[1].className = "action-btn primary";
            btns[2].className = "action-btn secondary";
        })
        btns[2].addEventListener('click',async ()=>{
            let markup =""
            if(!patients.length) {
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
                           <span class="success"></span>
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
            if(patients?.length){
            await handleUserTableUi()
            }
            btns[0].className = "action-btn secondary";
            btns[1].className = "action-btn secondary";
            btns[2].className = "action-btn primary";
        })

    };
    getData()
}


const unlockInputs = ()=>{
    const formGroups = document.querySelectorAll('.form-group')
    const inputs = document.querySelectorAll('.form-input.create-measure')
    const btn = document.querySelector('.submit-btn')

    inputs.forEach((input,i)=>{
        input.disabled = false;
        input.value = ""
        formGroups[i+1].classList.remove('hidden')
    })
    btn.disabled = false;
    btn.classList.remove('hidden')
}

const handleCreateMeasure =  async (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const values = {};
    
    formData.forEach((value, key) => {
        values[key] = value;
    });

    const data = await createMeasure(values)

    document.querySelector('.success').innerHTML = data?.message
    setTimeout(()=>{
    document.querySelector('.success').innerHTML = ""
    },3000)
    
}
const handleUpdateMeasure = async (measureId)=>{
    const inputs = document.querySelectorAll('.edit-input')
    const data = await updateMeasure(measureId,inputs[0].value,inputs[1].value,inputs[2].value)
//handle Error ?
    document.querySelector('.search-success').innerHTML = data.message 
    handleMeasureAvgTable()
}

const handleEditMeasure = (id)=>{
    const table = document.querySelector("#measure-tb")  
    let markup = ""
    window.measures.forEach(measure=>{
        if(measure.id === id){
            markup += `<tr id="mid-${measure.id}" class="${measure.critical ? "crit" : ""}">
            <td>${measure.id}</td>
            <td>${measure.user_id}</td>
            <td><input type="number" class="form-input edit-input" value="${measure.syst_high}" id="syst-${measure.id}"></td>
            <td><input type="number" class="form-input edit-input" value="${measure.pulse}" id="pulse-${measure.id}"></td>
            <td><input type="number" class="form-input edit-input" value="${measure.dias_low}" id="dias-${measure.id}"></td>
            <td>${measure.date.split('T')[0]}</td>
            <td class="table-actions">
                <button class="submit-btn" onclick="handleUpdateMeasure(${measure.id})">
                    <i class="fas fa-check"></i>
                    Update
                </button>
                <button class="delete-btn" onclick="handleMeasureAvgTable(true)">
                                    <i class="fa-solid fa-xmark"></i>
                                    Cancel
                                </button>
            </td>
        </tr>`
        }else{
            markup +=`<tr id="mid-${measure.id}" class="${measure.critical ? "crit" : ""} ">
                             <td>${measure.id}</td>
                             <td>${measure.user_id}</td>
                             <td>${measure.syst_high}</td>
                             <td>${measure.pulse}</td>
                             <td>${measure.dias_low}</td>
                             <td>${measure.date.split('T')[0]}</td>
                             <td class="table-actions">
                                 <button class="edit-btn" onclick="handleEditMeasure(${measure.id})">
                                     <i class="fas fa-pen-to-square"></i>
                                     Edit
                                 </button>
                                 <button class="delete-btn" onclick="handleDeleteMeasure(${measure.id})">
                                    <i class="fas fa-trash"></i>
                                    Delete
                                </button>
                             </td>
                         </tr>`
        }
        table.innerHTML = ""
    table.insertAdjacentHTML("afterbegin",markup)
})             
}
const handleDeleteMeasure = async (measureId)=>{
    const data = await deleteMeasure(measureId)
    
//handle Error ?
console.log(data);

    document.querySelector('.search-success').innerHTML = data.message 
    handleMeasureAvgTable()
}

const handleMeasureAvgTable = async (aborted = false)=>{
    const searchEl = document.querySelector('.search-select')
    const inputs = document.querySelectorAll('.search-input')
const startDate = inputs[0].value
const endDate = inputs[1].value

if(!searchEl.value) {
    document.querySelector('.search-error').innerHTML = "Please select patient first"
    return
}
if((!startDate && endDate) || (startDate && !endDate)) {
    document.querySelector('.search-error').innerHTML = "Must provide bouth Start and End date (range) to make the search"
    return
}


document.querySelector('.search-error').innerHTML=""
if(!aborted){
    window.measures = await getAllMeasuresAvg(searchEl.value,startDate,endDate).then(res=>res.data)
}
    const table = document.querySelector("#measure-tb")  
       let markup = ""
       window.measures.forEach(measure=>{
            markup +=`<tr id="mid-${measure.id}" class="${measure.critical ? "crit" : ""} ">
                             <td>${measure.id}</td>
                             <td>${measure.user_id}</td>
                             <td>${measure.syst_high}</td>
                             <td>${measure.pulse}</td>
                             <td>${measure.dias_low}</td>
                             <td>${measure.date.split('T')[0]}</td>
                             <td class="table-actions">
                                 <button class="edit-btn" onclick="handleEditMeasure(${measure.id})">
                                     <i class="fas fa-pen-to-square"></i>
                                     Edit
                                 </button>
                                 <button class="delete-btn" onclick="handleDeleteMeasure(${measure.id})">
                                    <i class="fas fa-trash"></i>
                                    Delete
                                </button>
                             </td>
                         </tr>`
    })

table.innerHTML = ""
    table.insertAdjacentHTML("afterbegin",markup)
}
if(window.location.pathname === '/patientsMeasures'){
const btns = document.querySelectorAll('.action-btn')
const searchBtn = document.querySelector('.search-btn')

const slider = {
    currentSlide: 0,
    slides: document.querySelectorAll('.content-container'),
    sliderContainer: document.querySelector('.slider'),
    
    init() {   
        
        btns[0].addEventListener('click', () => this.goToSlide(0));
        btns[1].addEventListener('click', () => this.goToSlide(1));
        
        this.updateSlidePositions();
        this.updateButtonStates();
    },
    
    goToSlide(index) {
        if (index !== this.currentSlide) {
            this.currentSlide = index;
            this.updateSlidePositions();
            this.updateButtonStates();
        }
    },
    
    updateSlidePositions() {
        this.slides.forEach((slide, index) => {
            const offset = (index - this.currentSlide) * 100;
            slide.style.transform = `translateX(${offset}%)`;
        });
    },
    
    updateButtonStates() {
        if (this.currentSlide === 0) {            
            btns[0].classList.add('primary')
            btns[0].classList.remove('secondary')
            btns[1].classList.add('secondary')
            btns[1].classList.remove('primary')
        }else{
            btns[1].classList.add('primary')
            btns[1].classList.remove('secondary')
            btns[0].classList.add('secondary')
            btns[0].classList.remove('primary')
        }
        
    }
};

const getData = async ()=>{
    patients = await getAllUsers().then(res=>res.data)
    await  selectUiHandler()
    slider.init();

   }
    getData();

}