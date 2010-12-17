class Feature < Struct.new(:description)
  attr_accessor :stories

  def initialize(*args)
    super
    @stories = []
  end
end
