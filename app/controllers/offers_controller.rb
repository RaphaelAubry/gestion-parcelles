class OffersController < ApplicationController
  before_action :authenticate_user!
  before_action :offer, only: [:edit, :update, :destroy]

  def index
    @offers = authorized_scope(Offer.left_outer_joins(:supplier), type: :relation, as: :access, scope_options: { supplier: current_user })

    respond_to do |format|
      format.html
      format.json { render json: @offers }
    end
  end

  def table
    if params[:order]
      order = params[:order]["0"][:name].present? ? params[:order]["0"][:name] + " " + params[:order]["0"][:dir].upcase : ""
    end

    authorize! @offers = authorized_scope(Offer.left_outer_joins(:supplier), type: :relation, as: :access, scope_options: { user: current_user })

    @offers = @offers.tap { |x| @total_count = x.count }
                     .where("offers.name LIKE ?", "%#{params[:search][:value]}%")
                     .or(@offers.where("offers.unit LIKE ?", "%#{params[:search][:value]}%"))
                     .or(@offers.where("offers.price::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                     .or(@offers.where("offers.created_at::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                     .or(@offers.where("supplier.name LIKE ?", "%#{params[:search][:value]}%"))
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
          data: @offers.map do |o|
                  [ o.name,
                    o.unit,
                    o.price,
                    l(o.created_at, format: :short),
                    o&.supplier&.name,
                    "<a href='/offers/#{o.id}/edit'>modifier</a>
                     <a href='/offers/#{o.id}' data-turbo-method='delete'>supprimer</a>
                    "
                  ]
                end
          }
      end
    end
  end

  def new
    @supplier = Supplier.find(params[:supplier_id])
    @offer = Offer.new
  end

  def create
    @supplier = Supplier.find(params[:supplier_id])
    @offer = Offer.create(offer_params)
    @offer.supplier = @supplier

    if @offer.save
      respond_to do |format|
        format.html { redirect_to offers_path, notice: 'Créé avec succès'}
      end
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @offer.update(offer_params)
      respond_to do |format|
        format.html { redirect_to offers_path,  notice: 'Modifié(e) avec succès'}
      end
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @offer.destroy
    respond_to do |format|
      format.html { redirect_to supplier_path(@offer.supplier)}
    end
  end

  private

  def offer_params
    params.require(:offer).permit(Offer::INSTANCE_VARIABLES)
  end

  def offer
    @offer = Offer.find(params[:id])
  end
end
