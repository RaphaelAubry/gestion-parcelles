class OffersController < ApplicationController
  before_action :authenticate_user!
  before_action :offer, only: [:edit, :update, :destroy]

  def index
    @offers = current_user.suppliers
                          .joins(:offers)
                          .select('offers.id',
                                  'offers.name',
                                  'offers.unit',
                                  'offers.price',
                                  'offers.updated_at',
                                  'suppliers.name as supplier'
                          )
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
        format.html { redirect_to supplier_path(@supplier)}
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
        format.html { redirect_to supplier_path(@offer.supplier)}
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
