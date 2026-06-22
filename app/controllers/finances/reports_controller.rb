module Finances
  class ReportsController < ApplicationController
    before_action :authenticate_user!

    def index
    end

    def invoices
      @invoices = authorized_scope(Invoice, type: :relation, as: :invoices_balances)

      respond_to do |format|
        format.html
        format.json { render json: @payments }
      end   
    end
  
    def invoices_table
      if params[:order]
        order = params[:order]["0"][:name].present? ? params[:order]["0"][:name] + " " + params[:order]["0"][:dir].upcase : ""
      end

      @invoices = authorized_scope(Invoice, type: :relation, as: :invoices_balances)
      @invoices = @invoices.tap { |x| @total_count = x.size }
                           .where("invoices.year::TEXT LIKE ?", "%#{params[:search][:value]}%")
                           .or(@invoices.where("invoices.number::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                           .or(@invoices.where("invoices.total_amount::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                           .order(order)
                           .tap { |x| @filtered_count = x.size }
                           .limit(params[:length])
                           .offset(params[:start])
                          
        respond_to do |format|
          format.html
          format.json do
            render json: {
              draw: params[:draw],
              recordsTotal: @total_count.keys.size,
              recordsFiltered: @filtered_count.keys.size,
              total: @total, 
              data: @invoices.map do |i|
                      [ 
                        i.year,
                        i.number,
                        i.total_amount,
                        i.balance,
                        ""
                      ]
                    end
              }
          end
        end
    end
  end
end