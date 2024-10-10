class SuppliersController < ApplicationController
  before_action :authenticate_user!
  before_action :user, only: [:create]
  before_action :supplier, except: [:index, :new, :create]

  def index
    @suppliers = current_user.suppliers
  end

  def new
    @supplier = Supplier.new
  end

  def create
    @supplier = Supplier.create(supplier_params)
    @supplier.user = @user

    if @supplier.save

      respond_to do |format|
        format.html { redirect_to suppliers_path, notice: 'Enregistré(e) avec succès' }
      end
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @offers = @supplier.offers
  end

  def edit
  end

  def update
    if @supplier.update(supplier_params)

      respond_to do |format|
        format.html { redirect_to suppliers_path, notice: 'Modifié(e) avec succès' }
      end
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @supplier.destroy

    respond_to do |format|
      format.html { redirect_to suppliers_path, notice: 'Supprimé(e) avec succès' }
    end
  end

  private

  def supplier_params
    params.require(:supplier).permit(Supplier::INSTANCE_VARIABLES)
  end

  def user
    @user = current_user
  end

  def supplier
    @supplier = Supplier.find(params[:id])
  end
end
