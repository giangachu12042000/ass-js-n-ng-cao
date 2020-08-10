
const URL = new URLSearchParams(window.location.search);
const id = URL.get('id');
window.SystemCore = {
    url: `https://5f2a80ea6ae5cc00164229bb.mockapi.io/hospitals/${id}/patients`,
    fetchData: function(){
      axios({
        method:'GET',
        url: this.url,
        responseType: 'json'
      })
      .then(res => {
        if (res.data.length > 0) {
          let data = res.data;
          let result = "";
          data.map((item, key) => {
            result += `
                    <tr id="data-${item.id}"> 
                        <td> ${item.id}  </td> 
                        <td class-name='name'> ${item.name}  </td>
                        <td class-name='adress'> ${item.age}  </td>
                        <td class-name='avatar'> ${item.bed_no}  </td>
                        <td> 
                            <button
                                type="button" class="edit-btn btn btn-primary" onclick={openEditE(${item.id})}> edit
                            </button>
                            <button class="btn btn-danger" onClick="removeE(${item.id})">
                              deletE 
                            </button>
                        </td> 
                    </tr>`;
          });
          document.querySelector("tbody").innerHTML = result;
        }
      });
    },
    getNameHospital: function(){
      axios({
        method:'GET',
        url: `https://5f2a80ea6ae5cc00164229bb.mockapi.io/hospitals/${id}`,
        responseType: 'json'
      })
      .then(res => {
        const data = res.data;
        let tagP = `
         <span> ${data.name} </span>
        `;
         document.querySelector('.name-hospital').innerHTML += tagP ; 
        // console.log(a)
      })
    },
    fetchHospital: function(){
      axios({
        method:'GET',
        url: 'https://5f2a80ea6ae5cc00164229bb.mockapi.io/hospitals',
        responseType: 'json'
      })
      .then(res=>{
        if(res.data.length > 0){ 
          let options ;
          res.data.map((item,key)=>{
            options += `
              <option value="${item.id}"> ${item.name} </option>
            `
          }) 
          document.querySelector('#select').innerHTML = options;
        }
      })
    }
}
// ======================================================================>
//                            create room
// ======================================================================>
const modal = document.getElementById('myModal');
const btn = document.querySelector('.btn-create-modal');
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}

const btn_save = document.querySelector('.btn-save-create');
btn_save.onclick = function(){
  const editId = document.querySelector('input[name="id"]').value;
  const name = document.querySelector('input[name="name"]').value;
  const age = document.querySelector('input[name="age"]').value;
  const desc = document.querySelector('textarea[name="desc"]').value;
  const bed_no =  document.querySelector('input[name="bed_no"]').value;
  const hospital =  document.querySelector('select[name="hospital"]').value;
 
  let data = {
      name: name,
      age: age,
      bed_no: bed_no,
      description: desc,
      hospitalId:hospital
  };
  let url = `https://5f2a80ea6ae5cc00164229bb.mockapi.io/hospitals/${id}/patients/${editId}`;
  if (editId) {
    const form = $('#myform');
    if(form.valid()){
      axios({
        method:'PUT',
        url: url,
        responseType: 'json',
        data
      })
      .then(res =>{
        if(res.data.id == id){
          const data = res.data;
          document.querySelector(`#data-${data.id} td[class-name=name]`).innerText = data.name;
          document.querySelector(`#data-${data.id} td[class-name=adress]`).innerText = data.age; 
          document.querySelector(`#data-${data.id} td[class-name=avatar]`).innerText = data.bed_no; 
          modal.style.display = "none";
        }else{
          SystemCore.fetchData();
        }
      })
    }
  } else {
    const form = $('#myform');
    if(form.valid()){
      axios({
        method:'POST',
        url: url,
        responseType: 'json',
        data
      })
      .then(res=>{
        if (res.data){
          const data = res.data;
          let newRow = `<tr id="data-${data.id}"> 
                            <td> ${data.id}  </td> 
                            <td class-name='name'> ${data.name}  </td>  
                            <td class-name='adress'> ${data.age}  </td>  
                            <td class-name='avatar'> ${data.bed_no}  </td>  
                            <td> 
                                <button
                                    type="button" class="edit-btn btn btn-primary" onclick={openEditE(${data.id})}> edit
                                </button>
                                <button class="btn btn-danger" onClick="removeE(${data.id})">
                                deletE 
                                </button>
                            </td> 
                        <tr/>`;
          let newContent = document.querySelector('tbody').innerHTML;
          newContent += newRow;
          document.querySelector('tbody').innerHTML = newContent;
          modal.style.display = "none";
        }
      })
    }
  }
}
// ============================================================>
//                  opend modal to edit
// ============================================================>
function openEditE(patentId)
{
  axios({
    method:'GET',
    url: `https://5f2a80ea6ae5cc00164229bb.mockapi.io/hospitals/${id}/patients/${patentId}`,
    responseType: 'json'
  })
  .then(res =>{
    if (res.data) {
        const data = res.data;
        document.querySelector('input[name="id"]').value = data.id;
        document.querySelector('input[name="name"]').value = data.name;
        document.querySelector('input[name="age"]').value = data.age;
        document.querySelector('textarea[name="desc"]').value = data.description;
        document.querySelector('input[name="bed_no"]').value = data.bed_no;
        let select = document.getElementById("select").children ;
        var i;
        for (i = 0; i < select.length; i++) {
          console.log(select[i].value)
          const number = select[i].value;
          if(number == data.hospitalId){
            select[i].setAttribute('selected', 'selected');
          }
        }
        modal.style.display = "block";
    }
  })
}
// ============================================================>
//            delete
// =============================================================>
function removeE(deleteId)
{
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            axios({
              method: 'DELETE',
              url: `https://5f2a80ea6ae5cc00164229bb.mockapi.io/hospitals/${id}/patients/${deleteId}`
            })
            .then((data) => { 
                if (data) {
                    Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    )
                    SystemCore.fetchData();
                }
            });
        }
    })
}