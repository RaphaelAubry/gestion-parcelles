module ModelConcern
  extend ActiveSupport::Concern

  class_methods do
    def sort_with_params(params)
      if params[:sort]
        column_name = params[:sort].keys[0]
        if column_names.include? column_name.to_s
          all.order(column_name => params[:sort][column_name])
        else
          all
        end
      end
    end

    def filter_with_params(params)
      if params[:filter]
        column_name = params[:filter].keys[0]
        if column_names.include? column_name.to_s
          where(column_name => params[:filter][column_name])
        end
      else
        all
      end
    end
  end
end
