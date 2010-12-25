(function($) {


  var Project = Model("project");
  // TODO: Use persistence
  Project.add(new Project({id: "01", name: "Project 01", description: "Project Description 01"}));
  Project.add(new Project({id: "02", name: "Project 02", description: "Project Description 02"}));
  Project.add(new Project({id: "03", name: "Project 03", description: "Project Description 03"}));


  var app = $.sammy('#main', function() {

    this.use('Template');

    this.get('#/', function(cx) {
      cx.redirect('#/projects');
    });

    this.get('#/projects', function(cx) {
      cx.render('templates/project_new.template').swap(cx.$element());

      Project.each(function() {
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

    this.get('#/project/:id', function(cx) {
      this.load("data/"+this.params['id']+".json")
      .then(function(project) {
        cx.render('templates/project.template', {project: project})
          .swap(cx.$element());
      })
      .then(function(project) {
        $.each(project.features, function(i, feature) {
          cx.render('templates/feature.template', {feature: feature})
          .appendTo('.feature');
        });
      });
    });

    this.bind('testalert', function(e, data) {
      this.log(e);
      this.log(data);
    });
  });

  $(function() {
    app.run('#/');
  });

})(jQuery);
