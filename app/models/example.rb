require 'date'

class Project < Struct.new(:name, :description)
  attr_accessor :releases
  attr_accessor :features
  
  def initialize(*args)
    super
    @releases, @features = [], []
  end
end

class Release < Struct.new(:description, :date)
  attr_accessor :stories

  def initialize(*args)
    super
    @stories = []
  end
end

class Feature < Struct.new(:description)
  attr_accessor :stories

  def initialize(*args)
    super
    @stories = []
  end
end

class Story < Struct.new(:description, :estimate, :status)
end

p fable = Project.new("fable", "kanbanban goodness")

p r1 = Release.new('kickstart', Date.new(2011, 1, 15))
fable.releases << r1
p fable.releases

fable.features << Feature.new('admin stuff')
p fable.features
