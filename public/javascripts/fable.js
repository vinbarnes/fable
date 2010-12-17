(function($) {


  var app = $.sammy('#main', function() {

    this.use('Template');

    this.get('#/', function(context) {
      context.app.swap('');
      this.load('/projects')
      .then(function(projects) {
        $.each(projects, function(i, project) {
          context.render('templates/projects.template', {project: project})
            .appendTo(context.$element());
        });
      });
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
  });

  $(function() {
    app.run('#/');
  });

})(jQuery);
