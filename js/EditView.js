var EditView = function(employee, store) {

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('submit', '#edit-form', this.updateEmployee)
    };

    this.render = function() {
        this.el.html(EditView.template(employee));
        return this;
    };

    this.updateEmployee = function (event) {
        event.preventDefault();
        console.log('Updating record');

        var employee = {
            id: $('#employee-id').val(),
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            title: $('#title').val(),
            city: $('#city').val(),
            cellPhone: $('#cellPhone').val(),
            officePhone: $('#officePhone').val(),
            email: $('#email').val()

        };

        store.updateEmployee(employee, function () {
            alert("Employee Updated");
        });
    };

    this.initialize();

}

EditView.template = Handlebars.compile($("#edit-tpl").html());