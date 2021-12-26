var allUsersData=[],usersData=[],adminsData=[];
$( function() {
   
    let promise0 = new Promise(async function (resolve, reject) {
            const res= await fetch("/data",{
            method:'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type' : 'application/json'
             },
            redirect : 'follow',
            referrerPolicy :"no-referrer",
            body: ""
            })
            allUsersData= await res.json()
             resolve(123);               
          
        });
    
      let promise1 = new Promise(function (resolve, reject) {
            Promise.all([promise0]).then(function (values) {
              usersData=allUsersData.filter(item => item.UserRole =="user");
              adminsData=allUsersData.filter(item => item.UserRole =="admin");
              console.log("Admins Data "+adminsData[1]);
              var gridDataSource = new kendo.data.DataSource({
          data: usersData,
          schema: {
            model: {
              fields: {
                // UserID: { type: "number" },
                FirstName: { type: "String" },
                LastName: { type: "String" },
                UserName: { type: "String" },               
              }
            }
          },
          pageSize: 10,
          // sort: {
          //   field: "OrderDate",
          //   dir: "desc"
          // }
        });
        // function filterGrid(country) {
        //   $("#usersGrid").data("kendoGrid").dataSource.filter({
        //     field: "ShipCountry",
        //     operator: "eq",
        //     value: country
        //   });
        // }
        $("#usersGrid").kendoGrid({
          dataSource: gridDataSource,
          dataBound: function(e) {
            var grid = e.sender;

            
            grid.unbind("dataBound");
          },
          height: 400,
          pageable: true,
          sortable: true,
         // filterable: true,
         
           columns: [
            //  {
          //   field:"UserID",
          //   title: "User ID",
          //   width: 160
          // },
           {
            field: "FirstName",
            title: "First Name",
            width: 160,
            // template: "<span style='color:#= getFreightColor(Freight) #'>#= Freight #</span>"
          }, {
            field: "LastName",
            title: "Last Name",
            width: 160,
            // format: "{0:dd MMMM yyyy}"
          }, {
            field: "UserName",
            title: "User Name",
            width: 160,
          }]
        });

        $("#usersGrid").on("click", "tr", async function(e) {
         
          var usersG = $("#usersGrid").data("kendoGrid");
          var selectedItem = usersG.dataItem(this);
          console.log(selectedItem.UserID);

         var currentUrl= window.location.href;
        
         window.location.href = "http://localhost:3000/users/"+selectedItem.UserID+"?UserName="+selectedItem.FirstName;
      
         
        });

        resolve(123);
            });
        });
      
     // await init();
  

      });

      function changeTab(role) {
        var dataSourceGrid = new kendo.data.DataSource({data: [] });
        var grid = $("#usersGrid").data("kendoGrid");
       
       switch(role){
         case 'users':
          dataSourceGrid = new kendo.data.DataSource({data: usersData });
        
           break;
           case 'admins':
            dataSourceGrid = new kendo.data.DataSource({data: adminsData });
             break;
       }
       var current = document.getElementsByClassName("active");
       current[0].className = current[0].className.replace(" active", "");
       document.getElementById(role).classList.add("active");
       grid.setDataSource(dataSourceGrid);
      }
            

    
