var EditView = function(employee) {

    this.initialize = function() {
        this.el = $('<div/>');
    };

    this.render = function() {
        this.el.html(EditView.template(employee));
        return this;
    };

    this.initialize();

}

EditView.template = Handlebars.compile($("#edit-tpl").html());