function setData(index, id_text, id_notifi) {
      $(document).ready(function () {

            if (index == "1") host = "http://localhost:1010/golang"
            //for nodejs server
            if (index == "2") host = "http://localhost:1010/node"

            input = document.getElementById(id_text).value
            notifi = document.getElementById(id_notifi)
            console.log(input)

            $.ajax({
                  type: "POST",
                  url: host,
                  data: "name="+input,
                  dataType: "json",
              
                  success: function(data) {
                      alert(data[1]);
                  },
                  error: function(data){
                      alert("fail");
                  }
              });
      })
}


function getData(index, id_text, id_notifi) {
      $(document).ready(function () {
            console.log("index is :" + index + "\n")
            //for php server
            //for golang server
            if (index === 1) { host = "http://localhost:1010/golang"; }
            //for nodejs server
            if (index == 2) { host = "http://localhost:1010/node"; }
            console.log("host is :" + host + "\n")

            input = document.getElementById(id_text).value
            notifi = document.getElementById(id_notifi)

            console.log("host: " + host + "?name=" + input)
            $.ajax({
                  type: 'GET',
                  url: host,
                  data: 'name=' + input,
                  cache: false,
                  success: function (result) {
                        //      const data = JSON.parse(result);
                        if (result["response"] === -1)
                              notifi.innerHTML = "nothing found"
                        else {
                              alert(result["response"])
                              notifi.innerHTML = "encode is " + result["response"]
                        }

                  }
            });
      })
}
