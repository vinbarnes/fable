(function($) {


  var app = $.sammy('#main', function() {

    this.use('Template');


    this.get('#/', function(cx) {
      cx.redirect('#/projects');
    });

    this.get('#/projects', function(cx) {

      var projects = getProjects();
      cx.render('templates/project_new.template').swap(cx.$element());

      projects.each(function() {
        console.log(this.attr("name"));
        cx.render('templates/projects.template', {project: this.attributes})
          .appendTo(cx.$element());
      });
    });

    // GET new
    this.get('#/projects/new', function(cx) {
      cx.log('new');
      cx.app.swap('');
      cx.render('templates/project_form.template')
        .swap(cx.$element());
    });

    this.get('#/projects/:id', function(cx) {
      var project = Project.find(this.params.id);
      cx.log(project.attributes); 
      cx.render('templates/projects.template', {project: project.attributes})
      .swap(cx.$element());
    });

    this.bind('testalert', function(e, data) {
      this.log(e);
      this.log(data);
    });

    function getProjects() {

      var Project = Model("project", {
        persistence: Model.localStorage()
      });

      Project.load();
      if (Project.count() < 1) {
        Project.add(new Project(
          {id: 1, name: "Project 01", description: "Project Description 01" })
        );
        Project.add(new Project(
          {id: 2, name: "Project 02", description: "Project Description 02"})
        );
        Project.add(new Project(
          {id: 3, name: "Project 03", description: "Project Description 03"})
        );
      }

      return Project;
    }
  });

  $(function() {
    app.run('#/');
  });

})(jQuery);
