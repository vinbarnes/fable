(function($) {


  var app = $.sammy('#main', function() {

    this.use('Template');

    this.get('#/', function(context) {
      context.redirect('#/projects');
    });

    this.get('#/projects', function(context) {
      context.render('templates/project_new.template').swap(context.$element());
      this.load('/data/projects.json')
      .then(function(projects) {
        $.each(projects, function(i, project) {
          context.render('templates/projects.template', {project: project})
            .appendTo(context.$element());
        });
      })
      .then(context.trigger('testalert', 1));
    });

    // GET new
    this.get('#/projects/new', function(cx) {
      context.app.swap('');
      context.render('templates/project_form.template')
        .swap(context.$element());
    });

    this.get('#/project/:id', function(context) {
      this.load("data/"+this.params['id']+".json")
      .then(function(project) {
        context.render('templates/project.template', {project: project})
          .swap(context.$element());
      })
      .then(function(project) {
        $.each(project.features, function(i, feature) {
          context.render('templates/feature.template', {feature: feature})
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
