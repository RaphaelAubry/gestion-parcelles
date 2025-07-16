class SuppliersController < ApplicationController
  before_action :authenticate_user!
  before_action :user, only: [:create]
  before_action :supplier, except: [:index, :new, :create, :table]

  def index
    @suppliers = authorized_scope(Supplier, type: :relation, as: :access, scope_options: { user: current_user })

    respond_to do |format|
      format.html
      format.json { render json: @suppliers }
    end
  end

  def table
    if params[:order]
      order = params[:order]["0"][:name].present? ? params[:order]["0"][:name] + " " + params[:order]["0"][:dir].upcase : ""
    end

    authorize! @suppliers = authorized_scope(Supplier, type: :relation, as: :access, scope_options: { user: current_user })

    @suppliers = @suppliers.tap { |x| @total_count = x.count }
                           .where("name LIKE ?", "%#{params[:search][:value]}%")
                           .or(@suppliers.where("phone::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                           .or(@suppliers.where("email LIKE ?", "%#{params[:search][:value]}%"))
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
          data: @suppliers.map do |s|
                  [ s.name,
                    s.phone,
                    s.email,
                    "<a href='/suppliers/#{s.id}/edit'>modifier</a>
                     <a href='/suppliers/#{s.id}' data-turbo-method='delete'>supprimer</a>
                     <a href='/supplier/#{s.id}/offers/new'>nouvelle prestation</a>
                    "
                  ]
                end
          }
      end
    end
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
