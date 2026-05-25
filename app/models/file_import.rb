class FileImport
  include ActiveModel::Model

  attr_accessor :file

  require "csv"

  def csv?
    self.file&.original_filename && File.extname(self.file.original_filename).casecmp(".csv").zero?
  end

  def grape_prices_headers_valid?
    headers = CSV.read(file.path, headers: true, col_sep: ";", encoding: "ISO-8859-1:UTF-8").headers
    headers == GrapePrice::HEADERS
  end

  def load_data
    CSV.foreach(file.path, headers: true, col_sep: ";", encoding: "ISO-8859-1:UTF-8") do |row|
       yield row 
    end 
  end
end