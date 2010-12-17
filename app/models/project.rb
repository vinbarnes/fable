class Project < Struct.new(:name, :description)
  attr_accessor :releases
  attr_accessor :features
  
  def initialize(*args)
    super
    @releases, @features = [], []
  end
end
