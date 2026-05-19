# app/controllers/contracts_controller.rb
class ContractsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_contract, only: %i[show edit update destroy]

  def index
    @contracts = authorized_scope(Contract.all)

    respond_to do |format|
      format.html
      format.json { render json: @contracts }
    end
  end

  def table
    if params[:order]
      order = params[:order]["0"][:name].present? ? params[:order]["0"][:name] + " " + params[:order]["0"][:dir].upcase : ""
    end

    @contracts = authorized_scope(Contract.all)

    @contracts = @contracts.tap { |x| @total_count = x.count }
                     .where("contracts.name LIKE ?", "%#{params[:search][:value]}%")
                     .or(@contracts.where("contracts.start_date::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                     .or(@contracts.where("contracts.end_date::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                     .or(@contracts.where("contracts.holder LIKE ?", "%#{params[:search][:value]}%"))
                     .or(@contracts.where("contracts.type LIKE ?", "%#{params[:search][:value]}%"))
                     .or(@contracts.where("contracts.unit LIKE ?", "%#{params[:search][:value]}%"))
                     .or(@contracts.where("contracts.unit_price::TEXT LIKE ?", "%#{params[:search][:value]}%"))
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
          data: @contracts.map do |c|
                  [ c.name,
                    c.start_date,
                    c.end_date,
                    c.holder,
                    c.type,
                    c.unit_price,
                    c.unit,
                    "<a href='/contracts/#{c.id}/edit'>modifier</a>
                     <a href='/contracts/#{c.id}' data-turbo-method='delete'>supprimer</a>
                    "
                  ]
                end
          }
      end
    end
  end

  def show
  end

  def new
    @contract = contract_class.new
  end

  def create
    @contract = contract_class.new(contract_params.merge(user: current_user))

    if @contract.save
      redirect_to contracts_path, notice: "Contrat créé."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @contract.update(contract_params)
      redirect_to contracts_path, notice: "Contrat mis à jour."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @contract.destroy

    redirect_to contracts_path, notice: "Contrat supprimé."
  end

  private

  def set_contract
    @contract = Contract.find(params[:id])
  end

  def contract_class
    params[:type].presence_in(%w[MetayageContract FermageContract])&.constantize || Contract
  end

  def contract_params
    params.require(:contract).permit(
      :name,
      :start_date,
      :end_date,
      :holder,
      :unit_price, 
      :unit,
      :type
    )
  end
end