var WebSqlStore = function(successCallback, errorCallback) {

    this.initializeDatabase = function(successCallback, errorCallback) {
        var self = this;
        this.db = window.openDatabase("EmployeeDB", "1.0", "Employee Demo DB", 200000);
        this.db.transaction(
                function (tx) {

                    var setupData = false;//self.doesDataExist(tx);
                    if (!setupData) {
                        self.createTable(tx);
                        self.addSampleData(tx);
                    }
                },
                function(error) {
                    console.log('Transaction error: ' + error);
                    if (errorCallback) errorCallback();
                },
                function() {
                    console.log('Transaction success');
                    if (successCallback) successCallback();
                }
        )
    }

    this.doesDataExist = function(tx)
    {
        var doesExist = false;
        var sql = "SELECT COUNT(id) FROM employee";

        tx.executeSql(sql, null,
        function (tx, results) {

            if(results.rows.length > 0)
            {
                doesExist = true;
            }

            console.log('Table length check success');
        },
        function (tx, error) {
            //alert('Error checking table rows: ' + error.message);
            console.log('Error checking table rows: ' + error.message);
        });

        return doesExist;
    }

    this.createTable = function(tx) {
        //tx.executeSql('CREATE TABLE IF NOT EXISTS employee');
        tx.executeSql('DROP TABLE IF EXISTS employee');
        var sql = "CREATE TABLE IF NOT EXISTS employee ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "firstName VARCHAR(50), " +
            "lastName VARCHAR(50), " +
            "title VARCHAR(50), " +
            "managerId INTEGER, " +
            "city VARCHAR(50), " +
            "officePhone VARCHAR(50), " +
            "cellPhone VARCHAR(50), " +
            "email VARCHAR(50), " +
            "photo VARCHAR(100))";
        tx.executeSql(sql, null,
                function() {
                    console.log('Create table success');
                },
                function(tx, error) {
                    alert('Create table error: ' + error.message);
                });
    }

    this.addSampleData = function(tx, employees) {
        var employees = [
                { "id": 1, "firstName": "Ryan", "lastName": "Howard", "title": "Vice President, North East", "managerId": 0, "city": "New York, NY", "cellPhone": "212-999-8888", "officePhone": "212-999-8887", "email": "ryan@dundermifflin.com", "photo": "img/Ryan_Howard.jpg" },
                { "id": 2, "firstName": "Michael", "lastName": "Scott", "title": "Regional Manager", "managerId": 1, "city": "Scranton, PA", "cellPhone": "570-865-2536", "officePhone": "570-123-4567", "email": "michael@dundermifflin.com", "photo": "img/Michael_Scott.jpg" },
                { "id": 3, "firstName": "Dwight", "lastName": "Schrute", "title": "Assistant Regional Manager", "managerId": 2, "city": "Scranton, PA", "cellPhone": "570-865-1158", "officePhone": "570-843-8963", "email": "dwight@dundermifflin.com", "photo": "img/Dwight_Schrute.jpg" },
                { "id": 4, "firstName": "Jim", "lastName": "Halpert", "title": "Assistant Regional Manager", "managerId": 2, "city": "Scranton, PA", "cellPhone": "570-865-8989", "officePhone": "570-968-5741", "email": "dwight@dundermifflin.com", "photo": "img/Jim_Halpert.jpg" },
                { "id": 5, "firstName": "Pamela", "lastName": "Beesly", "title": "Receptionist", "managerId": 2, "city": "Scranton, PA", "cellPhone": "570-999-5555", "officePhone": "570-999-7474", "email": "pam@dundermifflin.com", "photo": "img/Pamela_Beesly.jpg" },
                { "id": 6, "firstName": "Angela", "lastName": "Martin", "title": "Senior Accountant", "managerId": 2, "city": "Scranton, PA", "cellPhone": "570-555-9696", "officePhone": "570-999-3232", "email": "angela@dundermifflin.com", "photo": "img/Angela_Martin.jpg" },
                { "id": 7, "firstName": "Kevin", "lastName": "Malone", "title": "Accountant", "managerId": 6, "city": "Scranton, PA", "cellPhone": "570-777-9696", "officePhone": "570-111-2525", "email": "kmalone@dundermifflin.com", "photo": "img/Kevin_Malone.jpg" },
                { "id": 8, "firstName": "Oscar", "lastName": "Martinez", "title": "Accountant", "managerId": 6, "city": "Scranton, PA", "cellPhone": "570-321-9999", "officePhone": "570-585-3333", "email": "oscar@dundermifflin.com", "photo": "img/Oscar_Martinez.jpg" },
                { "id": 9, "firstName": "Creed", "lastName": "Bratton", "title": "Quality Assurance", "managerId": 2, "city": "Scranton, PA", "cellPhone": "570-222-6666", "officePhone": "570-333-8585", "email": "creed@dundermifflin.com", "photo": "img/Creed_Bratton.jpg" },
                { "id": 10, "firstName": "Andy", "lastName": "Bernard", "title": "Sales Director", "managerId": 4, "city": "Scranton, PA", "cellPhone": "570-555-0000", "officePhone": "570-646-9999", "email": "andy@dundermifflin.com", "photo": "img/Andy_Bernard.jpg" },
                { "id": 11, "firstName": "Phyllis", "lastName": "Lapin", "title": "Sales Representative", "managerId": 10, "city": "Scranton, PA", "cellPhone": "570-241-8585", "officePhone": "570-632-1919", "email": "phyllis@dundermifflin.com", "photo": "img/Phyllis_Lapin.jpg" },
                { "id": 12, "firstName": "Stanley", "lastName": "Hudson", "title": "Sales Representative", "managerId": 10, "city": "Scranton, PA", "cellPhone": "570-700-6464", "officePhone": "570-787-9393", "email": "shudson@dundermifflin.com", "photo": "img/Stanley_Hudson.jpg" },
                { "id": 13, "firstName": "Meredith", "lastName": "Palmer", "title": "Supplier Relations", "managerId": 2, "city": "Scranton, PA", "cellPhone": "570-588-6567", "officePhone": "570-981-6167", "email": "meredith@dundermifflin.com", "photo": "img/Meredith_Palmer.jpg" },
                { "id": 14, "firstName": "Kelly", "lastName": "Kapoor", "title": "Customer Service Rep.", "managerId": 2, "city": "Scranton, PA", "cellPhone": "570-123-9654", "officePhone": "570-125-3666", "email": "kelly@dundermifflin.com", "photo": "img/Kelly_Kapoor.jpg" },
                { "id": 15, "firstName": "Toby", "lastName": "Flenderson", "title": "Human Resources", "managerId": 1, "city": "Scranton, PA", "cellPhone": "570-485-8554", "officePhone": "570-699-5577", "email": "toby@dundermifflin.com", "photo": "img/Toby_Flenderson.jpg" }
            ];
        var l = employees.length;
        var sql = "INSERT OR REPLACE INTO employee " +
            "(id, firstName, lastName, managerId, title, city, officePhone, cellPhone, email, photo) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = employees[i];
            tx.executeSql(sql, [e.id, e.firstName, e.lastName, e.managerId, e.title, e.city, e.officePhone, e.cellPhone, e.email, e.photo],
                    function() {
                        console.log('INSERT success');
                    },
                    function(tx, error) {
                        alert('INSERT error: ' + error.message);
                    });
        }
    }

    this.findByName = function(searchKey, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.firstName, e.lastName, e.title, count(r.id) reportCount " +
                    "FROM employee e LEFT JOIN employee r ON r.managerId = e.id " +
                    "WHERE e.firstName || ' ' || e.lastName LIKE ? " +
                    "GROUP BY e.id ORDER BY e.lastName, e.firstName";

                tx.executeSql(sql, ['%' + searchKey + '%'], function(tx, results) {
                    var len = results.rows.length,
                        employees = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        employees[i] = results.rows.item(i);
                    }
                    callback(employees);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    }

    this.findById = function(id, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.firstName, e.lastName, e.title, e.city, e.officePhone, e.cellPhone, e.email, e.photo, e.managerId, m.firstName managerFirstName, m.lastName managerLastName, count(r.id) reportCount " +
                    "FROM employee e " +
                    "LEFT JOIN employee r ON r.managerId = e.id " +
                    "LEFT JOIN employee m ON e.managerId = m.id " +
                    "WHERE e.id=:id";

                tx.executeSql(sql, [id], function(tx, results) {
                    callback(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    };

    this.updateEmployee = function (employee, callback) {
        this.db.transaction(
            function (tx) {

                var sql = "UPDATE employee " +
                "SET firstName = ?, lastName = ? , title = ?, city = ?, cellPhone = ?, officePhone = ?, email = ?" +
                "WHERE id = ?";

                tx.executeSql(sql, [employee.firstName, employee.lastName, employee.title, employee.city, employee.cellPhone, employee.officePhone, employee.email, employee.id],
                        function () {
                            console.log('UPDATE success');
                            callback();
                        },
                        function (tx, error) {
                            alert('INSERT error: ' + error.message);
                        });
            }
        );
    };

    this.updateEmployeePhoto = function (id, photoUrl, callback) {
        this.db.transaction(
            function (tx) {

                var sql = "UPDATE employee " +
                "SET photo = ? " +
                "WHERE id = ?";

                tx.executeSql(sql, [photoUrl, id],
                        function () {
                            console.log('UPDATE success photo url = ' + photoUrl + ' id = ' + id);
                            callback();
                        },
                        function (tx, error) {
                            alert('INSERT error: ' + error.message);
                        });
            }
        );
    };

    this.initializeDatabase(successCallback, errorCallback);

}
