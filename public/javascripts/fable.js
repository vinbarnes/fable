(function($) {


  var app = $.sammy('#main', function() {

    this.use('Template');

    this.get('#/', function(cx) {
      cx.redirect('#/projects');
    });

    this.get('#/projects', function(cx) {
      cx.render('templates/project_new.template').swap(cx.$element());
      this.load('/data/projects.json')
      .then(function(projects) {
        $.each(projects, function(i, project) {
          cx.render('templates/projects.template', {project: project})
            .appendTo(cx.$element());
        });
      })
      .then(cx.trigger('testalert', 1));
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
