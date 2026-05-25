class Admin::GrapePricesController < ApplicationController
  before_action :authorize!

  def index
    @grape_prices = authorized_scope(GrapePrice.all)
  end

  def table
    if params[:order]
      order = params[:order]["0"][:name].present? ? params[:order]["0"][:name] + " " + params[:order]["0"][:dir].upcase : ""
    end

    @grape_prices = authorized_scope(GrapePrice.all)

    @grape_prices = @grape_prices.tap { |x| @total_count = x.count }
                     .where("grape_prices.source LIKE ?", "%#{params[:search][:value]}%")
                     .or(@grape_prices.where("grape_prices.year::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                     .or(@grape_prices.where("grape_prices.area LIKE ?", "%#{params[:search][:value]}%"))
                     .or(@grape_prices.where("grape_prices.unit LIKE ?", "%#{params[:search][:value]}%"))
                     .or(@grape_prices.where("grape_prices.town LIKE ?", "%#{params[:search][:value]}%"))
                     .or(@grape_prices.where("grape_prices.grape_type LIKE ?", "%#{params[:search][:value]}%"))
                     .or(@grape_prices.where("grape_prices.price::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                     .order(order)
                     .tap { |x| @filtered_count = x.count }
                     .limit(params[:length])
                     .offset(params[:start])

    respond_to do |format|
      format.json do
        render json: {
          draw: params[:draw],
          recordsTotal: @total_count,
          recordsFiltered: @filtered_count,
          total: @total, 
          data: @grape_prices.map do |c|
                  [ c.source,
                    c.year,
                    c.area,
                    c.unit,
                    c.town,
                    c.grape_type,
                    c.price
                  ]
                end
          }
      end
    end
  end

  def new
    @file_import = FileImport.new
  end

  def import
    @file_import = FileImport.new
    
    # vérification existence
    unless params[:file_import].present?
      @file_import.errors.add(:import, "Un fichier doit être sélectionné")
      return render :new, status: :unprocessable_entity
    end

    @file_import.file = params[:file_import][:file]

    # vérification extension .csv
    unless @file_import.csv?
      @file_import.errors.add(:type, "Le fichier doit être un CSV")
      return render :new, status: :unprocessable_entity
    end

    
    
    begin 
    
      # vérification des noms des colonnes
      unless @file_import.grape_prices_headers_valid?
        @file_import.errors.add(:columns, "Les colonnes doivent être dans cet ordre: #{GrapePrice::HEADERS.join(" | ")}")  
        return render :new, status: :unprocessable_entity
      end
      
      @file_import.load_data do |row|
        attrs = row.to_h.transform_keys { |k| k.to_s.strip }

        price = attrs["price"].to_s.tr(",", ".")
        attrs["price"] = BigDecimal(price) if price.present?

        attrs["unit"] = attrs["unit"].tr("\u0080", "€")

        GrapePrice.create(attrs)
      end

      redirect_to admin_grape_prices_path, notice: "Import du fichier CSV: #{@file_import.file.original_filename} effectué"

    rescue CSV::MalformedCSVError
      @file_import.errors.add(:content, "CSV invalide, vérifier le contenu du fichier")
      return render :new, status: :unprocessable_entity
    end
  end
end