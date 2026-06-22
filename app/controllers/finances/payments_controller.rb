module Finances
  class PaymentsController < ApplicationController
    before_action :authenticate_user!
    before_action :payment, only: [:edit, :update, :destroy]

    def index
      authorize! Payment, to: :index?
      @payments = authorized_scope(Payment.all, type: :relation, as: :access)
    
      respond_to do |format|
        format.html
        format.json { render json: @payments }
      end
    end

    def table
      authorize! Payment, to: :table?

      if params[:order]
        order = params[:order]["0"][:name].present? ? params[:order]["0"][:name] + " " + params[:order]["0"][:dir].upcase : ""
        order.gsub!('invoice_number', 'invoices.number')
      end
      
      @payments = authorized_scope(Payment.joins(:invoice), type: :relation, as: :access)

      @payments = @payments.tap { |x| @total_count = x.count }
                      .where("payments.payment_date::TEXT LIKE ?", "%#{params[:search][:value]}%")
                      .or(@payments.where("payments.amount::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                      .or(@payments.where("invoices.number LIKE ?", "%#{params[:search][:value]}%"))
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
            data: @payments.map do |p|
                    [ p.payment_date,
                      p.amount,
                      p.invoice.number,
                      "<a href='/finances/payments/#{p.id}/edit'>modifier</a>
                      <a href='/finances/payments/#{p.id}' data-turbo-method='delete'>supprimer</a>
                      "
                    ]
                  end
            }
        end
      end
    end

    def new
      @payment = Payment.new
      @invoices = scope_invoices

      authorize! @payment
    end

    def create
      @payment = Payment.new(payment_params)
      authorize! @payment
      @payment.user = current_user

      if @payment.save
        redirect_to finances_payments_path, notice: "Paiement de #{sprintf("%.2f", @payment.amount)} enregistré"
      else
        @invoices = scope_invoices
        render :new, status: :unprocessable_entity
      end
    end

    def edit
      @invoices = scope_invoices
    end

    def update
      if @payment.update(payment_params)
        redirect_to finances_payments_path, notice: "Paiement de #{sprintf("%.2f", @payment.amount)} modifié"
      else
        @invoices = scope_invoices
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      @payment.destroy

      redirect_to finances_payments_path, notice: "Paiement supprimé."
    end

    private

    def payment_params
      params.require(:payment).permit(:payment_date, :amount, :invoice_id)
    end

    def payment
      @payment = Payment.find(params[:id])
      authorize! @payment
    end

    def scope_invoices
      authorized_scope(Invoice.all)
        .order(:number)
        .pluck(:number, :total_amount, :id)
        .map do |number, total_amount, id|
          ["#{[number, total_amount].compact_blank.join(' - ')}", id]
        end
    end
  end
end