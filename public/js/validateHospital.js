
$(document).ready(function(event){
   
    $("#myform").submit(function(e) {
        e.preventDefault();
    })
    .validate({
        rules: {
          name: "required",
          avatar: {
            required: true,
            url: true
          },
          adress: {
            required: true,
            minlength: 6,
            maxlength: 225
          },
          bed_number: {
            required: true,
            number: true,
            min: 1,
            max: 444
          },
          hospital: {
            required: true,
          },
          age: {
            required: true,
            number: true,
            min: 1,
            max: 100
          },
          bed_no: {
            required: true,
            number: true,
            min: 1,
            max: 333
          },
          desc: {
            required: true,
            minlength: 6,
            maxlength: 225
          }
        },
        messages: {
          name: "hãy nhập tên bệnh viện",
          avatar: "hãy nhập một đường link ảnh ",
          adress: "hãy nhập địa chỉ ít nhất 6 ký tự và dài nhất 225 ký tự",
          bed_number: "hãy nhập số giường bệnh lớn hơn 0 và nhỏ hơn 444",
          age: 'hãy nhập tuổi, tuổi lớn hơn 0 và nhỏ hơn 100',
          bed_no: 'hãy nhập số giường bệnh lớn hơn 0 và nhỏ hơn 444',
          desc: 'hãy nhập miêu tả trong khoang 6 đến 225 ký tự',
          hospital:'hãy chọn bệnh viện'
        },
        submitHandler: function(form) {
          form.submit();
          return false
        }
      });
})