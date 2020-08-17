window.SystemCore = {
  url: "https://5f2a80ea6ae5cc00164229bb.mockapi.io/hospitals",
  fetchData: function () {
    document.getElementById("loader").style.display = "none";
    document.getElementById("background-load").style.display = "block";
    fetch(this.url)
      .then((reponse) => reponse.json())
      .then((data) => {
        if (data.length > 0) {
          let result = "";
          data.map((item, key) => {
            result += `
                    <tr id="data-${item.id}"> 
                       
                          <td> ${item.id}  </td> 
                          <td class-name='name'>${item.name}</td>  
                          <td class-name='adress'>${item.adress}</td>  
                          <td class-name='bed_number'>${item.bed_number}</td>  
                          <td class-name='avatar'>
                            <img class="img-fluid" src="${item.logo}" alt="">
                          </td>
                        <td> 
                            <button
                                type="button" class="edit-btn btn btn-primary" onclick={openEditE(${item.id})}> edit
                            </button>
                            <button class="btn btn-danger" onClick="SystemCore.removeE(${item.id})">
                             deletE 
                            </button>
                            <button type="button" class="btn btn-warning">
                              <a href="room.html?id=${item.id}" > information</a> 
                            </button>
                        </td> 
                    </tr>
                    `;
          });
          document.querySelector("tbody").innerHTML = result;
        }
      });
  },
  delePatient: function(patientId){
    console.log(patientId,'========>?')
    let urlP = `https://5f2a80ea6ae5cc00164229bb.mockapi.io/hospitals/${patientId}/patients`;
    axios({
      method: 'GET',
      url: urlP,
    })
    .then(res =>{
      if(res){
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
          )
        SystemCore.fetchData();
      }
    })
  }
  ,
  removeE: function (id) {
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
                let removeUrl = `${this.url}/${id}/patients`;
                document.getElementById("loader").style.display = "block";
                document.getElementById("background-load").style.display = "none";
                fetch(removeUrl, { method: "GET" })
                .then((response) => response.json())
                .then((data) => {
                  if (data.length > 0) {
                        let lengthD = data.length;
                        data.map((item,key)=>{
                          axios({
                            method: 'DELETE',
                            url: `${this.url}/${id}/patients/${item.id}`
                          })
                          .then(res => {
                            ++key;
                            if(res.data && key == lengthD){
                              axios({
                                method: 'DELETE',
                                url: `${this.url}/${id}`
                              })
                              .then(res => {
                                if(res){
                                  document.getElementById("loader").style.display = "none";
                                  Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                    );
                                    SystemCore.fetchData();
                                }
                              })
                            }
                          })
                        })
                    }else{
                      axios({
                        method: 'DELETE',
                        url: `${this.url}/${id}`
                      })
                      .then(res => {
                        if(res){
                          Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                            );
                            SystemCore.fetchData();
                        }
                      })
                    }
                });
            }
        })
  }
};
// ===========================================>query DOM
var modal = document.getElementById("myModal"); 
var btn = document.querySelector(".btn-create-modal"); 
var span = document.getElementsByClassName("close")[0]; 
btn.onclick = function() { 
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
} 

document.querySelector('.btn-save-create').onclick = function()
{
  const name = document.querySelector('input[name="name"]').value;
  const avatar = document.querySelector('input[name="avatar"]').value;
  const adress = document.querySelector('input[name="adress"]').value;
  const bedNumber =  document.querySelector('input[name="bed_number"]').value;
 
  let data = {
      name: name,
      logo: avatar,
      adress: adress,
      bed_number: bedNumber,
  };
  // =======================================================>
  //                      edit
  // =======================================================>
  let id = document.querySelector('input[name="id"]').value;
  if(id){
    const form = $('#myform');
    if(form.valid()){
      let baseApiUrl = `https://5f2a80ea6ae5cc00164229bb.mockapi.io/hospitals/${id}`;
      fetch(baseApiUrl, {
          method: 'PUT',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(function(response) {
          return response.json();
      })
      .then(function(item) {
        if(item){
          document.querySelector(`#data-${item.id} td[class-name=name]`).innerText = item.name;
          document.querySelector(`#data-${item.id} td[class-name=adress]`).innerText = item.adress; 
          document.querySelector(`#data-${item.id} td[class-name=avatar] img`).src = item.logo;  
          document.querySelector(`#data-${item.id} td[class-name=bed_number]`).innerText = item.bed_number; 
          modal.style.display = "none";
        }
      })
    }
  }
  // ==============================================>
  //                add
  // ==============================================>
  else{
    const form = $('#myform');
    if(form.valid()){
      let baseApiUrl = `https://5f2a80ea6ae5cc00164229bb.mockapi.io/hospitals`;
      fetch(baseApiUrl, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(function(response) {
          return response.json();
      })
      .then(function(item) {
          let newRow = `<tr id="data-${item.id}">
                          <td>${item.id}</td>
                          <td class-name="name">${item.name}</td> 
                          <td class-name="adress">${item.adress}</td> 
                          <td class-name="bed_number">${item.bed_number}</td> 
                          <td class-name="avatar">
                            <img src="${item.logo}" alt="">
                          </td>
                          <td>
                              <button
                                  type="button" class="edit-btn btn btn-primary" onclick={openEditE(${item.id})} > edit
                              </button>
                              <button class="btn btn-danger" onClick="SystemCore.removeE(${item.id})"> 
                                deletE 
                              </button>
                              <button type="button" class="btn btn-secondary">
                                <a href="room.html?id=${item.id}" class="text-warning" style="color:red!" > information</a> 
                              </button>
                          </td>
                      </tr>`;
          let content = document.querySelector('tbody').innerHTML;
          content += newRow;
          document.querySelector('tbody').innerHTML = content;
          modal.style.display = "none";
      })
    }
  }
}
//===============================================>
//             open modal to  edit
// ==============================================>
function openEditE(id)
{
  let baseApiUrl = `https://5f2a80ea6ae5cc00164229bb.mockapi.io/hospitals/${id}`;
    fetch(baseApiUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    })
    .then(function(response) {
        return response.json();
    })
    .then((data)=>{
      if (data) {
          document.querySelector('input[name="id"]').value = data.id;
          document.querySelector('input[name="name"]').value = data.name;
          document.querySelector('input[name="avatar"]').value = data.logo;
          document.querySelector('input[name="adress"]').value = data.adress;
          document.querySelector('input[name="bed_number"]').value = data.bed_number;
          modal.style.display = "block";
      }
    })
}
