class Array
  def average
    begin
      sum / length
    rescue Exception => e
      Rails.logger.debug e.class
      Rails.logger.debug e.message
      Rails.logger.debug e.backtrace.join('\n')
      return nil
    end
  end
end
