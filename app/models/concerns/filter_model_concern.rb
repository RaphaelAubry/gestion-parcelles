module FilterModelConcern
  extend ActiveSupport::Concern

  class_methods do
    def sort_with_params(params)
      if params[:sort]
        column_name = params[:sort].except(:ids).keys[0]
        if column_names.include? column_name.to_s
          order(column_name => params[:sort][column_name])
        elsif column_name == :tag_name.to_s
          joins(:tag).order(name: params[:sort][column_name])
        end
      end
    end

    def filter_with_params(params)
      if params[:filter]
        column_name = params[:filter].keys[0]
        if column_names.include? column_name.to_s
          unless params[:filter][column_name] == "nil"
            where(column_name => params[:filter][column_name])
          else
            where("#{column_name} IS ?", nil)
          end
        end
      end
    end
  end
end
