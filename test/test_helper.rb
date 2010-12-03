ENV["RAILS_ENV"] = "test"
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'contest'

class Test::Unit::TestCase
  class << self
    alias_method :it, :test
  end
end

class ActiveSupport::TestCase

  # Add more helper methods to be used by all tests here...
end
