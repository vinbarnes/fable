class Release < Struct.new(:description, :date)
  attr_accessor :stories

  def initialize(*args)
    super
    @stories = []
  end
end
