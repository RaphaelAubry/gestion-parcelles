# app/controllers/contracts_controller.rb
class ContractsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_contract, only: %i[show edit update destroy destroy_associated_parcelle]

  def index
    @contracts = authorized_scope(Contract.all)
    authorize! @contracts

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
    authorize! @contracts

    @contracts = @contracts.tap { |x| @total_count = x.count }
                     .where("contracts.name LIKE ?", "%#{params[:search][:value]}%")
                     .or(@contracts.where("contracts.start_date::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                     .or(@contracts.where("contracts.end_date::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                     .or(@contracts.where("contracts.holder LIKE ?", "%#{params[:search][:value]}%"))
                     .or(@contracts.where(<<~SQL, "%#{params[:search][:value]}%")
                                            CASE contracts.type
                                              WHEN 'MetayageContract' THEN 'Métayage'
                                              WHEN 'FermageContract' THEN 'Fermage'
                                            END ILIKE ?
                                          SQL
                        )
                     .or(@contracts.where("contracts.unit LIKE ?", "%#{params[:search][:value]}%"))
                     .or(@contracts.where("contracts.quantity::TEXT LIKE ?", "%#{params[:search][:value]}%"))
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
                    c.display_start_date,
                    c.display_end_date,
                    c.holder,
                    c.display_type,
                    c.display_quantity,
                    c.unit,
                    "<a href='/contracts/#{c.id}/edit'>modifier</a>
                     <a href='/contracts/#{c.id}' data-turbo-method='delete'>supprimer</a>
                     <a href='/invoices/new/?contract_id=#{c.id}'>facturer</a>
                    "
                  ]
                end
          }
      end
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json do
        render json: { contract: @contract, parcelles: @contract.parcelles.map { |p| { parcelle: p, tag: p.tag } } }
      end
    end
  end

  def new
    @contract = contract_class.new
    authorize! @contract, with: ContractPolicy 

    @parcelles_availables = scope_parcelle_availables
  end

  def create
    @contract = contract_class.new(contract_params.except(:parcelle_ids))
    authorize! @contract, with: ContractPolicy

    @contract.user = current_user
    
    if @contract.save
      parcelle_ids = contract_params[:parcelle_ids].reject(&:blank?)

      Parcelle.where(id: parcelle_ids).update_all(contract_id: @contract.id)

      redirect_to contracts_path, notice: "Contrat créé."
    else
      @parcelles_availables = scope_parcelle_availables
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @parcelles_availables = scope_parcelle_availables
  end

  def update
    if @contract.update(contract_params.except(:parcelle_ids))
      parcelle_ids = contract_params[:parcelle_ids].reject(&:blank?)
     
      parcelle_ids.each do |id|
        Parcelle.find(id).update(contract_id: @contract.id)
      end

      redirect_to contracts_path, notice: "Contrat mis à jour."
    else
      @parcelles_availables = scope_parcelle_availables
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @contract.destroy

    redirect_to contracts_path, notice: "Contrat supprimé."
  end

  def destroy_associated_parcelle
    parcelle = Parcelle.find(params[:parcelle_id])
    parcelle.update(contract_id: nil) 

    @parcelles_availables = scope_parcelle_availables

    redirect_to edit_contract_path(@contract), notice: "Parcelle #{parcelle.reference_cadastrale} retirée."
  end

  private

  def set_contract
    @contract = Contract.find(params[:id])

    authorize! @contract, with: ContractPolicy
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
      :quantity, 
      :unit,
      :type,
      parcelle_ids: []
    )
  end

  def scope_parcelle_availables
    authorized_scope(Parcelle, type: :relation, as: :available_for_contract, scope_options: { user: current_user })
                                .pluck(:reference_cadastrale, :lieu_dit, :surface, :id)
                                .map { |p| [ [p[0], p[1], p[2]].compact.join(' - '), p[3] ] }
                                .sort
  end
end