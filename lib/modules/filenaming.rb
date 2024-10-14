module Filenaming
  class << self
    def now
      [Time.now.year, Time.now.month, Time.now.day].join
    end
  end
end
