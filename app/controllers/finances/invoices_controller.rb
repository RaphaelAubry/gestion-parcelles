module Finances
  class InvoicesController < ApplicationController
    include InvoiceContractable
    
    before_action :authenticate_user!
    before_action :invoice, only: [ :edit, :update, :destroy ]

    def index
      authorize! Invoice, to: :index?
      @invoices = authorized_scope(Invoice.all)
    end

    def table
      authorize! Invoice, to: :table?

      if params[:order]
        order = params[:order]["0"][:name].present? ? params[:order]["0"][:name] + " " + params[:order]["0"][:dir].upcase : ""
      end

      @invoices = authorized_scope(Invoice.all)
      
      @invoices = @invoices.tap { |x| @total_count = x.count }
                      .where("invoices.invoicer LIKE ?", "%#{params[:search][:value]}%")
                      .or(@invoices.where("invoices.invoicee ILIKE ?", "%#{params[:search][:value]}%"))
                      .or(@invoices.where("invoices.number ILIKE ?", "%#{params[:search][:value]}%"))
                      .or(@invoices.where("invoices.invoice_date::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                      .or(@invoices.where("invoices.total_amount::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                      .or(@invoices.where("invoices.number ILIKE ?", "%#{params[:search][:value]}%"))
                      .or(@invoices.where("invoices.contract_name ILIKE ?", "%#{params[:search][:value]}%"))
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
            data: @invoices.map do |i|
                    [ i.invoicer,
                      i.invoicee,
                      i.invoice_date,
                      i.year,
                      i.total_amount,
                      i.number,
                      i.contract_name,
                      "<a href='/finances/invoices/#{i.id}/edit'>modifier</a>
                      <a href='/finances/invoices/#{i.id}' data-turbo-method='delete'>supprimer</a>
                      "
                    ]
                  end
            }
        end
      end

    end

    def new
      if params[:contract_id]
        @contract = Contract.find(params[:contract_id])
        if @contract.parcelles.empty?
          redirect_to finances_invoices_path, notice: "Vous devez rattacher des parcelles à ce contrat #{@contract.name}"
        end

        @invoice = Invoice.new(invoicee: @contract.holder , invoicer: current_user.email)
        @contract.parcelles.each do |parcelle|
          if parcelle
            @invoice.invoice_lines.build(
              reference_cadastrale: parcelle.reference_cadastrale,
              lieu_dit: parcelle.lieu_dit,
              surface: parcelle.surface,
              percentage: @contract.initial_percentage,
              quantity: @contract.initial_quantity,
              contract_type: @contract.display_type,
            )
          end
        end
      else
        @invoice = Invoice.new
        @invoice.invoice_lines.build
      end
    end

    def create
      @invoice = Invoice.new(invoice_params)
      @contract = Contract.find(params[:invoice][:contract_id])
      @invoice.user = current_user
      @invoice.set_number

      if @invoice.save
        
        redirect_to finances_invoices_path, notice: "Facture créée"
      else
        if @invoice.invoice_lines.blank?
          if @contract
              @contract.parcelles.each do |parcelle|
              if parcelle
                @invoice.invoice_lines.build(
                  reference_cadastrale: parcelle.reference_cadastrale,
                  lieu_dit: parcelle.lieu_dit,
                  surface: parcelle.surface,
                  percentage: @contract.initial_percentage,
                  quantity: @contract.initial_quantity,
                  contract_type: @contract.display_type,
                )
              end
            end
          else
            @invoice.invoice_lines.build 
          end
        end
        render :new, status: :unprocessable_entity
      end
    end

    def edit
      @contract = build_invoice_contract(@invoice)
    end

    def update
      if @invoice.update(invoice_params)

        redirect_to finances_invoices_path
      else
        render :edit, status: :unprocessable_entity
      end

    end

    def destroy
      @invoice.destroy

      redirect_to finances_invoices_path, notice: "Facture supprimée."
    end

    private

    def invoice_params
      params.require(:invoice).permit(
        :invoicer,
        :invoicee,
        :invoice_date,
        :year,
        :contract_id,
        :contract_name,
        :contract_type,
        :contract_percentage,
        :contract_quantity,
        :number,
        :total_amount,
        invoice_lines_attributes: [
          :id,
          :reference_cadastrale,
          :lieu_dit,
          :surface,
          :quantity,
          :price,
          :amount,
          :percentage,
          :contract_type,
          :_destroy
        ]   
      )
    end

    def invoice
      @invoice = Invoice.find(params[:id])
      authorize! @invoice
    end
  end
end