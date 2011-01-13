(function($) {


  var app = $.sammy('#main', function() {

    this.use('Template');

    // Default route
    this.get('#/', function(cx) {
      cx.redirect('#/projects');
    });

    // GET projects (index)
    this.get('#/projects', function(cx) {

      var projects = getProjects();
      //cx.render('templates/project_new.template').swap(cx.$element());
      cx.app.swap('');

      projects.each(function() {
        console.log(this.attr("name"));
        cx.render('templates/projects.template', {project: this.attributes})
        .appendTo(cx.$element());
      });
    });

    // GET projects/new (new)
    this.get('#/projects/new', function(cx) {
      console.log("\n\n\nnew");
      cx.app.swap('');
      var Project = new Model("Project");
      var project = new Project({name: "", description: ""});
      cx.render('templates/project_new.template', {project: project.attributes})
      .swap(cx.$element());
    });

    // GET projects/:id (show)
    this.get('#/projects/:id', function(cx) {
      var projects = getProjects();
      var project = projects.find(this.params.id);
      cx.log(project.attributes); 
      cx.render('templates/project.template', {project: project.attributes})
      .swap(cx.$element());
    });

    // Test bind
    // Call with trigger
    this.bind('testalert', function(e, data) {
      this.log(e);
      this.log(data);
    });

    // Load projects from local storage
    // TODO: Modify to use REST storage
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
